<?php
include_once('include/session.php');
// Contrary to the other files, this one does not include header.php
// here because it only redirects to another page according to the
// result of the Twinoid authentication.

// Initialize $_SESSION['token'] and $_SESSION['token_refresh'].
function do_twinoid_auth($code) {
  global $error_msg;
  if (! isset($code)) {
    $error_msg = 'bug!';
    return false;
  }
  $json = do_post_json('https://twinoid.com/oauth/token',
    array(
      'client_id' => APP_TWINOID_ID,
      'client_secret' => APP_SECRET_KEY,
      'redirect_uri' => APP_REDIRECT_URI,
      'code' => $code,
      'grant_type' => 'authorization_code'
    )
  );
  if (is_string($json)) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the Twinoid server:<br /><em>$json</em>",
      "fr" => "Erreur de connexion au serveur Twinoid :<br /><em>$json</em>"
    ]);
    return false;
  }
  if (isset($json->access_token)) {
    $_SESSION['token'] = $json->access_token;
    if (isset($json->expires_in)) {
      $_SESSION['token_refresh'] = time() + $json->expires_in - 60;
    } else {
      $_SESSION['token_refresh'] = time() + 300;
    }
    unset($error_msg);
    return true;
  } else if (isset($json->error)) {
    $error_msg = localized_msg([
      "en" => "Authentication error:<br /><em>" . $json->error . "</em>.",
      "fr" => "Échec lors de l'identification :<br /><em>" . $json->error
              . "</em>."
    ]);
    return false;
  } else {
    $error_msg = localized_msg([
      "en" => "Cannot parse the response from the Twinoid server.",
      "fr" => "Échec du décodage de la réponse du serveur Twinoid."
    ]);
    return false;
  }
}

// Initialize $_SESSION['uid'], $_SESSION['name'] and $_SESSION['avatar'].
function get_twinoid_user_info() {
  global $error_msg;
  if (! isset($_SESSION['token'])) {
    return false;
  }
  $json = do_post_json('http://twinoid.com/graph/me',
    array(
      'access_token' => $_SESSION['token'],
      'fields' => 'id,name,picture,locale,sites.fields(npoints)'
    )
  );
  if (is_string($json)) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the Twinoid server:<br /><em>$json</em>",
      "fr" => "Erreur de connexion au serveur Twinoid :<br /><em>$json</em>"
    ]);
    return false;
  }
  if (isset($json->error)) {
    $error_msg = localized_msg([
      "en" => "Error fetching Twinoid data:<br /><em>"
              . $json->error . "</em>.",
      "fr" => "Erreur de récupération des informations Twinoid :<br /><em>"
              . $json->error . "</em>."
    ]);
    return false;
  }
  if (! is_numeric($json->id)) {
    $error_msg = localized_msg([
      "en" => "Invalid Twinoid data: id=" . $json->id,
      "fr" => "Informations Twinoid incorrectes : id=" . $json->id
    ]);
  }
  $_SESSION['uid'] = intval($json->id);
  $_SESSION['name'] = $json->name;
  $_SESSION['locale'] = $json->locale;
  //  $_SESSION['sites'] = $json->sites;
  $_SESSION['h_score'] = 0;
  $_SESSION['t_score'] = 0;
  $_SESSION['t_nulls'] = 0;
  if (isset($json->sites)) {
    foreach ($json->sites as $site) {
      if (isset($site->npoints)) {
        $_SESSION['t_score'] += $site->npoints;
        if ($site->npoints > $_SESSION['h_score']) {
          $_SESSION['h_score'] = $site->npoints;
        }
      } else {
        $_SESSION['t_nulls']++;
      }
    }
  }
  if (isset($json->picture) && isset($json->picture->url)) {
    $_SESSION['avatar'] = $json->picture->url;
  }
  return true;
}

// Checks if this user can be automatically upgraded to another role
function check_role_upgrade($role) {
  if (($role == ROLE_NEWBIE) && ($_SESSION['t_score'] > 100)) {
    $role = ROLE_NORMAL;
  }
  if (($role == ROLE_NORMAL) && ($_SESSION['t_score'] > 1000)) {
    $role = ROLE_TRUSTED;
  }
  return $role;
}

// Initialize $_SESSION['role'] and updates the database.
function get_db_user_info() {
  global $error_msg;
  if (! isset($_SESSION['uid']) || ! is_int($_SESSION['uid'])) {
    return false;
  }
  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if ($mysqli->connect_error) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the database:<br /><em>"
              . $mysqli->error . "</em>",
      "fr" => "Erreur de connexion à la base de données: :<br /><em>"
              . $mysqli->error . "</em>"
    ]);
    return false;
  }
  if (! $mysqli->set_charset('utf8')) {
    $error_msg = localized_msg([
      "en" => "Error switching to UTF-8:<br /><em>"
              . $mysqli->error . "</em>",
      "fr" => "Erreur pour passer en UTF-8 :<br /><em>"
              . $mysqli->error . "</em>"
    ]);
    return false;
  }
  $sql_uid = db_quote_int($_SESSION['uid']);
  $sql_avatar = db_quote_str($mysqli, $_SESSION['avatar']);
  $sql_name = db_quote_str($mysqli, $_SESSION['name'], "'???'");
  $sql_locale = db_quote_str($mysqli, $_SESSION['locale']);
  $result = $mysqli->query("SELECT * FROM users WHERE uid=$sql_uid");
  if ($row = $result->fetch_assoc()) {
    // mise à jour d'un utilisateur déjà connu
    $_SESSION['role'] = check_role_upgrade($row['role']);
    if (($_SESSION['name'] != $row['name'])
        || ($_SESSION['avatar'] != $row['avatar'])
        || ($_SESSION['locale'] != $row['locale'])
        || ($_SESSION['role'] != $row['role'])) {
      $mysqli->query("UPDATE users SET name=$sql_name, avatar=$sql_avatar, locale=$sql_locale, role=" . $_SESSION['role'] . ", mtime=NOW(), atime=NOW() WHERE uid=$sql_uid");
    } else {
      $mysqli->query("UPDATE users SET atime=NOW() WHERE uid=$sql_uid");
    }
    if ($row['dinoz']) {
      $_SESSION['dinoz'] = $row['dinoz'];
    }
    if ($row['dimgs']) {
      $_SESSION['dimgs'] = $row['dimgs'];
    }
  } else {
    // création des données pour un nouvel utilisateur
    $_SESSION['role'] = check_role_upgrade(ROLE_NEWBIE);
    $mysqli->query("INSERT INTO users (uid, name, avatar, locale, role, ctime, mtime, atime) VALUES ($sql_uid, $sql_name, $sql_avatar, $sql_locale, " . $_SESSION['role'] . ", NOW(), NOW(), NOW())");
  }
  $result->free();
  $mysqli->close();
  return true;
}

// Documentation : http://twinoid.com/developers/doc
if (isset($_GET['state'])) {
  // Do the reverse of what is done by twin_auth_href()
  $redir_link = $_GET['state'];
  $redir_link = str_replace(array("^-", "^=", "^+"),
                            array(";",  "&",  "^"),
                            $redir_link);
} else {
  $redir_link = "";
}
if (isset($_SERVER["HTTP_HOST"])) {
  $redir_link = $_SERVER["HTTP_HOST"] . "/" . $redir_link;
} else {
  $redir_link = $_SERVER["SERVER_NAME"] . "/" . $redir_link;
}
if (strpos($redir_link, "://") === false) {
  $redir_link = "http://" . $redir_link;
}
if (isset($_GET['code'])) {
  $_SESSION = array();
  if (do_twinoid_auth($_GET['code'])) {
    if (get_twinoid_user_info()) {
      if (get_db_user_info()) {
        header("Location: " . $redir_link);
        exit();
        //$info_msg = "Location: " . $redir_link;
      }
    }
  }
} elseif (isset($_GET['error'])) {
  $_SESSION = array();
  $error_msg = localized_msg([
    "en" => "Error during Twinoid redirection:<br /><em>"
            . $_GET['error'] . "</em>",
    "fr" => "Erreur de redirection Twinoid :<br /><em>"
            . $_GET['error'] . "</em>"
  ]);
} else {
  $error_msg = localized_msg([
    "en" => "Incorrect call.  Missing parameters.",
    "fr" => "Appel incorrect.  Paramètres manquants."
  ]);
}

// If we reach this point, something went wrong...

$page_title = localized_msg(["en" => "Error", "fr" => "Erreur"]);
include_once('include/header.php');
//echo '<h2>Test</h2>';
//echo "<p>Debug:</p><pre>$XXX</pre>";
//echo "<p>Get :</p><pre>";
//print_r ($_GET);
//echo "</pre>\n";
//echo "<p>Post :</p><pre>";
//print_r ($_POST);
//echo "</pre>\n";
//echo "<p>Session :</p><pre>";
//print_r ($_SESSION);
//echo "</pre>\n";
//echo "<p>Server :</p><pre>";
//print_r ($_SERVER);
//echo "</pre>\n";
echo localized_msg([
  "en" => "<p class=\"error_box\">The connection to the Twinoid server has failed.  You are not authenticated and you will not be able to use some features of this site.</p>",
  "fr" => "<p class=\"error_box\">La connexion au serveur Twinoid a échoué.  Vous n'êtes pas identifié et ne pourrez pas profiter de certaines fonctions de ce site.</p>"
]);
include_once('include/footer.php');
?>
