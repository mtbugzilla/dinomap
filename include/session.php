<?php
// This file is designed to be included before the beginning of the page.
// It must modify the HTTP response headers and it is therefore important
// that nothing is printed or echoed before it, not even an empty line.

// Private infos (APP_SECRET_KEY, DB_USER, DB_PASS, etc.)
include_once('secrets.php');

// User role
const ROLE_BANNED   = 0; // Cannot log in, banned by admin
const ROLE_UNUSED1  = 1; // -
const ROLE_NEWBIE   = 2; // Basic user, less than 100 Twinoid points
const ROLE_NORMAL   = 3; // Less than 1000 Twinoid points
const ROLE_TRUSTED  = 4; // 1000 Twinoid points or more
const ROLE_UNUSED2  = 5; // -
const ROLE_REVIEWER = 6; // -
const ROLE_DEVEL    = 7; // -
const ROLE_MODERATE = 8; // -
const ROLE_ADMIN    = 9; // -

// Returns a message in the most appropriate language according to
// Twinoid locale (if known) or browser preferences.
function localized_msg($msgArray, $deflang = "en") {
  if (isset($_SESSION['locale'])) {
    // Use the session locale, based on the Twinoid locale.
    // This should be the most common case if authentication has succeeded.
    if (isset ($msgArray[$_SESSION['locale']])) {
      return $msgArray[$_SESSION['locale']];
    }
  } else if (isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])
	     && strlen($_SERVER["HTTP_ACCEPT_LANGUAGE"]) > 1) {
    // Modified parsing code from https://www.dyeager.org/  
    // Copyright © 2008 Darrin Yeager, BSD license.
    $x = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]);      
    foreach ($x as $val) {
      if (preg_match("/(.*);q=([0-1]{0,1}.\d{0,4})/i", $val, $matches)) {
	$langArray[strtolower($matches[1])] = (float)$matches[2];
      } else {
	$langArray[strtolower($val)] = 1.0;
      }
    }
    // Now try to find the best match in the list (highest q-value)
    $qval = 0.0;
    foreach ($langArray as $lang => $value) {
      if (($value > $qval) && isset($msgArray[$lang])) {
	$qval = (float)$value;
	$deflang = $lang;
      }
    }
    if ($qval > 0.0) {
      return $msgArray[$deflang];
    }
  }
  // No match found.  Pick the default language if possible.
  if (isset($msgArray[$deflang])) {
    return $msgArray[$deflang];
  }
  // Still no match.  Return the first value.
  return reset($msgArray);
}

// Sends a HTTP POST request and waits for a JSON response.
// Returns: JSON object or error message.
function do_post_json($url, $params, $http_options = array()) {
  $default_options = array(
    'method' => 'POST',
    'timeout' => 10,
    'header' => 'Content-type: application/x-www-form-urlencoded',
    'content' => http_build_query($params)
  );
  $http_options = array_merge($default_options, $http_options);
  $context = stream_context_create(array('http' => $http_options));
  $fp = fopen($url, 'rb', false, $context);
  if (!$fp) {
    $err = error_get_last();
    return $err['message'];
  }
  $response = stream_get_contents($fp);
  if ($response === false) {
    $err = error_get_last();
    return $err['message'];
  }
  return json_decode($response);
}

// Connects to the database and sets $error_msg in case of failure.
// Returns: $mysqli object or null in case of failure.
function db_connect() {
  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if ($mysqli->connect_error) {
    $error_msg = localized_msg([
      "en" => "Error connecting to the database: " . $mysqli->error,
      "fr" => "Erreur de connexion à la base de données : " . $mysqli->error
    ]);
    $mysqli->close();
    return null;
  }
  if (! $mysqli->set_charset('utf8')) {
    $error_msg = localized_msg([
      "en" => "Error switching to UTF-8: " . $mysqli->error,
      "fr" => "Erreur pour passer en UTF-8 : " . $mysqli->error
    ]);
    $mysqli->close();
    return null;
  }
  return $mysqli;
}

// Quotes a string so that it can be included in a MySQL query string
function db_quote_str($mysqli, $str, $if_unset = 'NULL') {
  if (isset($str)) {
    return "'" . $mysqli->real_escape_string($str) . "'";
  } else {
    return $if_unset;
  }
}

// Ensures that an integer is valid and can be included in a MySQL query string
function db_quote_int($num, $if_invalid = 'NULL') {
  $val = strval($num);
  if (ctype_digit($val)) {
    return $val;
  } else {
    return $if_invalid;
  }
}

// Generates a HTML link for Twinoid authentication.
function twin_auth_href($redir_link = NULL) {
  global $keep_query_params;
  if (! isset($redir_link)) {
    $redir_link = $_SERVER['REQUEST_URI'];
    if (isset($redir_link)) {
      if ($keep_query_params || strpos($redir_link, "?") === false) {
        $redir_link = substr($redir_link, 1);
        $redir_link = str_replace(array("do=logout&", "?do=logout"),
                                  array("",           ""),
                                  $redir_link);
      } else {
        $redir_link = substr($redir_link, 1, strpos($redir_link, "?") - 1);
        if (isset($_GET['css'])) {
          $redir_link .= '?css=' . $_GET['css'];
        }
      }
    } else {
      $redir_link = "./";
    }
  }
  // Simple encoding of the redirection link
  $redir_link = str_replace(array("^",  "&",  ";"),
                            array("^+", "^=", "^-"),
                            $redir_link);
  return 'https://twinoid.com/oauth/auth?client_id=' . APP_TWINOID_ID . '&amp;response_type=code&amp;scope=' . APP_SCOPES . '&amp;state=' . htmlspecialchars($redir_link);
}

// Initialization with modified HTTP headers: Cookie, Expires, etc.
session_cache_limiter('nocache');
session_name('sid');
session_start();

// Conditions that can trigger session changes
if (isset($_SESSION['token_refresh'])
    && (time() >= $_SESSION['token_refresh'])) {
  header("Location: " . twin_auth_href());
  $_SESSION = array();
  exit();
} elseif (isset($_GET['do']) && ($_GET['do'] == 'logout')) {
  $_SESSION = array();
  $info_msg = localized_msg(["en" => "You have logged out successfully.",
			     "fr" => "Déconnexion effectuée." ]);
}

// The session will be closed by header.php.
$session_write_close = true;
?>
