<?php
include_once('include/session.php');
// This file generates JSON output, so we do not include header.php.
header("Content-Type: application/json; charset=UTF-8");

// Get the list of dinos and trophies using the DinoRPG API
function get_dinorpg_info() {
  global $error_msg;
  if (! isset($_SESSION['token'])) {
    return false;
  }
  $json = do_post_json('http://www.dinorpg.com/tid/graph/me',
    array(
      'access_token' => $_SESSION['token'],
      'fields' => 'collections,dinos.fields(life,maxLife,pos,canAct,canGather,equip,status,effects)'
    )
  );
  if (is_string($json)) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the DinoRPG server: $json",
      "fr" => "Erreur de connexion au serveur DinoRPG : $json"
    ]);
    return false;
  }
  if (isset($json->error)) {
    $error_msg = localized_msg([
      "en" => "Error fetching DinoRPG data:" . $json->error,
      "fr" => "Erreur de récupération des informations DinoRPG :"
              . $json->error
    ]);
    return false;
  }
  if (! isset($json->id)) {
    $error_msg = localized_msg([
      "en" => "Missing id field in DinoRPG data",
      "fr" => "Champ id manquant dans les informations DinoRPG"
    ]);
    return false;
  }
  if (! is_numeric($json->id)) {
    $error_msg = localized_msg([
      "en" => "Invalid DinoRPG data: id=" . $json->id,
      "fr" => "Informations DinoRPG incorrectes : id=" . $json->id
    ]);
    return false;
  }
  $_SESSION['duid'] = intval($json->id);
  $_SESSION['dinos'] = $json->dinos;
  $_SESSION['collections'] = $json->collections;
  return true;
}

// Fetch the user profile page and extract the Flash vars for each dino.
function parse_dinorpg_profile($url) {
  global $error_msg;
  if (! isset($_SESSION['token'])) {
    return false;
  }
  if (! isset($_SESSION['duid'])) {
    return false;
  }
  $url = "http://www.dinorpg.com/user/" . $_SESSION['duid'];
  $context = stream_context_create(['http' => [
    'method' => 'GET',
    'timeout' => 20,
  ]]);
  $fp = fopen($url, 'rb', false, $context);
  if (!$fp) {
    $err = error_get_last();
    $err = $err['message'];
    $error_msg = localized_msg([
      "en" => "Error connecting to the DinoRPG server: $err",
      "fr" => "Erreur de connexion au serveur DinoRPG : $err"
    ]);
    return false;
  }
  $response = stream_get_contents($fp);
  if ($response === false) {
    $err = error_get_last();
    $err = $err['message'];
    $error_msg = localized_msg([
      "en" => "Error connecting to the DinoRPG server: $err",
      "fr" => "Erreur de connexion au serveur DinoRPG : $err"
    ]);
    fclose($fp);
    return false;
  }
  fclose($fp);
  // Parse the page and look for Flash variables
  $matches = [];
  $num = preg_match_all('|<script.*SWFObject.*dino\.swf.*"dino_(\d+)".*"FlashVars","data=(.*)".*</script>|Us',
			$response, $matches);
  $dinovars = [];
  if ($num) {
    for ($i = 0; $i < $num; $i++) {
      //echo "FOUND: " . $matches[1][$i] . " - " . $matches[2][$i] . "\n";
      $dinovars[$matches[1][$i]] = $matches[2][$i];
    }
  }
  $_SESSION['dinovars'] = $dinovars;
  return true;
}

// ...
function update_db_user_info() {
  global $error_msg;
  if (! isset($_SESSION['uid']) || ! is_int($_SESSION['uid'])) {
    return false;
  }
  if (! isset($_SESSION['duid']) || ! is_int($_SESSION['duid'])) {
    return false;
  }
  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if ($mysqli->connect_error) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the database: " . $mysqli->error,
      "fr" => "Erreur de connexion à la base de données : " . $mysqli->error
    ]);
    return false;
  }
  if (! $mysqli->set_charset('utf8')) {
    $error_msg = localized_msg([
      "en" => "Error switching to UTF-8: " . $mysqli->error,
      "fr" => "Erreur pour passer en UTF-8 : " . $mysqli->error
    ]);
    return false;
  }
  $sql_query = 'UPDATE users SET duid=' . db_quote_int($_SESSION['duid']);
  if (isset ($_SESSION['dinos'])) {
    $json_str = json_encode($_SESSION['dinos'], JSON_UNESCAPED_UNICODE);
    $sql_query .= ', dinos=' . db_quote_str($mysqli, $json_str);
  }
  if (isset ($_SESSION['collections'])) {
    $json_str = json_encode($_SESSION['collections'], JSON_UNESCAPED_UNICODE);
    $sql_query .= ', collections=' . db_quote_str($mysqli, $json_str);
  }
  if (isset ($_SESSION['dinovars'])) {
    $json_str = json_encode($_SESSION['dinovars'], JSON_UNESCAPED_UNICODE);
    $sql_query .= ', dinovars=' . db_quote_str($mysqli, $json_str);
  }
  $sql_query .= ', mtime=NOW(), atime=NOW() WHERE uid='
                . db_quote_int($_SESSION['uid']);;
  //echo "QUERY: $sql_query\n";
  if (! $mysqli->query($sql_query)) {
    $error_msg = localized_msg([
      "en" => "Error updating the database: " . $mysqli->error,
      "fr" => "Erreur de mise à jour de la base de données : " . $mysqli->error
    ]);
    $mysqli->close();
    return false;
  }
  $mysqli->close();
  return true;
}

if (isset($_SESSION['uid'])) {
  // Fetch all the info
  if (get_dinorpg_info()) {
    if (! isset ($_SESSION['dinovars'])) {
      parse_dinorpg_profile();
    }
    update_db_user_info();
  }
} else {
  $error_msg = localized_msg([
    "en" => "Missing user identity. Please check that you are authenticated and that you are not blocking cookies.",
    "fr" => "Identité manquante. Vérifiez que vous êtes bien authentifié et que vous ne bloquez pas les cookies."
  ]);
}

if (isset($error_msg)) {
  echo json_encode([ "error" => $error_msg ], JSON_UNESCAPED_UNICODE);
} else {
  echo json_encode([
                    "uid" => $_SESSION['uid'],
                    "duid" => $_SESSION['duid'],
                    "dinos" => $_SESSION['dinos'],
                    "collections" => $_SESSION['collections'],
                    "dinovars" => $_SESSION['dinovars']
		    ], JSON_UNESCAPED_UNICODE);
}

//echo json_encode([ "session" => $_SESSION ]);
?>
