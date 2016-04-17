<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
<?php if (isset($_GET['css']) && $_GET['css'] == 'g') { ?>
  <link href="http://fonts.googleapis.com/css?family=Play:400,700" rel="stylesheet" type="text/css" />
  <link href="css/style-gray.css" rel="stylesheet" type="text/css" />
<?php } else if (isset($_GET['css']) && $_GET['css'] == 'h') { ?>
  <link href="https://fonts.googleapis.com/css?family=Trade+Winds" rel="stylesheet" type="text/css" />
  <link href="css/style-hordes.css" rel="stylesheet" type="text/css" />
<?php } else { ?>
  <link href="https://fonts.googleapis.com/css?family=Titillium+Web:900" rel="stylesheet" type="text/css" />
  <link href="css/style-dino.css" rel="stylesheet" type="text/css" />
<?php } ?>
  <title><?= isset($page_title) ? $page_title : "DinoMap" ?></title>
</head>
<body>
<?= isset($page_title) ? "<h1>" . $page_title . "</h1>" : "" ?>
<div id="page">
<ul class="menu">
<?php
// add a menu item $name pointing to $url
function menu_item($url, $name) {
  global $self_link;
  if ($self_link == $url) {
    echo "  <li class=\"active\"><a href=\"$url\">$name</a></li>\n";
  } else {
    echo "  <li><a href=\"$url\">$name</a></li>\n";
  }
}

// store a reference to this page (without parameters) in $self_link
$self_link = $_SERVER['REQUEST_URI'];
if (! isset($self_link)) {
  $self_link = "./";
}
if (strpos($self_link, "?")) {
  $self_link = substr($self_link, 0, strpos($self_link, "?"));
}
// create the menu bar
menu_item("/", localized_msg([ "en" => "Home", "fr" => "Accueil" ]));
// (other menu items could be added here)
// the following items appear only for moderators
if (isset($_SESSION['role']) && $_SESSION['role'] >= ROLE_MODERATE) {
  menu_item("/test.php", "Test");
  menu_item("/users.php",
            localized_msg([ "en" => "Users", "fr" => "Utilisateurs" ]));
}
if (isset($_SESSION['name'])) {
  echo '  <li class="right"><b>' . $_SESSION['name'] . '</b><ul>
';
  echo '    <li><a href="http://twinoid.com/user/' . $_SESSION['uid'] . '" target="_blank">' . localized_msg([ "en" => "Twinoid Profile", "fr" => "Profil Twinoid" ]) . '</a></li>
';
  echo '    <li><a href="' . htmlspecialchars($self_link) . '?do=logout">' . localized_msg([ "en" => "Disconnect", "fr" => "Déconnexion" ]) . '</a></li>
';
  if (isset($_SESSION['avatar'])) {
    $avatar = $_SESSION['avatar'];
    if (substr($avatar, 0, 2) === "//") {
      $avatar = "http:" . $avatar;
    }
    echo '    <li><b><img style="max-width: 80px; max-height: 80px;" src="' . $avatar . '" /></b></li>
';
  }
  echo '</ul></li>
';
} else {
  echo '  <li class="right"><a href="' . twin_auth_href() . '">' . localized_msg([ "en" => "Connection", "fr" => "Connexion" ]) . '</a></li>
';
}
?>
</ul>
<div id="pagecontents">
<?php
if (isset($error_msg)) {
  echo '<p class="error_box">' . $error_msg . "</p>\n";
}
if (isset($info_msg)) {
  echo '<p class="info_box">' . $info_msg . "</p>\n";
}
if (isset($session_write_close) && $session_write_close) {
  // The page can keep on using the session but without modifying it.
  // This avoids blocking the session if processing the page takes too long.
  session_write_close();
}
?>
