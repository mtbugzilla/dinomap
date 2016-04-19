<?php
include_once('include/session.php');
// This file generates JSON output, so we do not include header.php.
header("Content-Type: application/json; charset=UTF-8");

// Base URL for the DinoRPG server of the corresponding language
function server_base_url($server_lang) {
  $server_url_map = [
    "en" => "http://en.dinorpg.com",
    "fr" => "http://www.dinorpg.com",
    "es" => "http://es.dinorpg.com",
    "de" => "http://de.dinorpg.com",
  ];
  if (isset($server_lang)
      && isset($server_url_map[$server_lang])) {
    return $server_url_map[$server_lang];
  }
  return reset($server_url_map);
}

// Get the list of dinos and trophies using the DinoRPG API.
// Returns the decoded JSON data, containing mainly $json->dinos
// and $json->collections.
function get_dinorpg_info($server_lang) {
  global $error_msg;
  if (! isset($_SESSION['token'])) {
    // FIXME: error message
    return null;
  }
  $json = do_post_json(server_base_url($server_lang) . "/tid/graph/me",
    array(
      'access_token' => $_SESSION['token'],
      'fields' => 'collections,dinos.fields(life,maxLife,pos,canAct,canGather,equip,status,effects)'
    )
  );
  if (is_string($json)) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the DinoRPG API server: $json",
      "fr" => "Erreur de connexion au serveur API DinoRPG : $json"
    ]);
    return null;
  }
  if (isset($json->error)) {
    $error_msg = localized_msg([
      "en" => "Error fetching DinoRPG API data: " . $json->error,
      "fr" => "Erreur de récupération des informations API DinoRPG : "
              . $json->error
    ]);
    return null;
  }
  if (! isset($json->id) || ! is_numeric($json->id)) {
    $error_msg = localized_msg([
      "en" => "Missing or invalid id field in DinoRPG API data",
      "fr" => "Champ id manquant ou invalide dans les informations API DinoRPG"
    ]);
    return null;
  }
  $duid_var = $server_lang . '_duid';
  if (! isset($_SESSION[$duid_var])
      || ($_SESSION[$duid_var] != intval($json->id))) {
    $_SESSION[$duid_var] = intval($json->id);
    $mysqli = db_connect();
    if ($mysqli) {
      $sql_query = "UPDATE users SET $duid_var="
	. db_quote_int($_SESSION[$duid_var])
	. ", mtime=NOW() WHERE uid=" . db_quote_int($_SESSION['uid']);
      if (! $mysqli->query($sql_query)) {
	$error_msg = localized_msg([
          "en" => "Error updating the database: " . $mysqli->error,
          "fr" => "Erreur de mise à jour de la base de données : "
	          . $mysqli->error
        ]);
	$mysqli->close();
	return null;
      }
      $mysqli->close();
    } else {
      return null;
    }
  }
  return $json;
//  $_SESSION['dinos'] = $json->dinos;
//  $_SESSION['collections'] = $json->collections;
}

// Fetch the user profile page and extract the Flash vars for each dino.
// Returns an array associating each dino with its Flash vars.
function parse_dinorpg_profile($server_lang, $duid) {
  global $error_msg;
  $url = server_base_url($server_lang) . "/user/$duid";
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
    return null;
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
    return null;
  }
  fclose($fp);
  // Parse the page and look for Flash variables
  // (This is a rather ugly hack.  This info should be part of the API.)
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
  return $dinovars;
}

/*
  TODO:
  - load from db (dinos+collection, dinovars)
  - save to db (idem)
  - calls from main
 */


// ... TO BE REWRITTEN
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


// FIXME: test
echo json_encode([ "session" => $_SESSION ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

if (isset($_SESSION['uid'])) {
  $json = get_dinorpg_info("fr");
  if ($json) {
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
  }
} else {
  $error_msg = localized_msg([
    "en" => "Missing user identity. Please check that you are authenticated and that you are not blocking cookies.",
    "fr" => "Identité manquante. Vérifiez que vous êtes bien authentifié et que vous ne bloquez pas les cookies."
  ]);
}

/*
    // FIXME: only fetch on request
    parse_dinorpg_profile($server_url);
    update_db_user_info();
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
//echo json_encode([ "session" => $_SESSION ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
*/

?>
