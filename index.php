<?php
include_once('include/session.php');
$page_title = "DinoMap";
include_once('include/header.php');

if (isset($_SESSION['name'])) {
  echo localized_msg([
    "fr" => "<h2>Bienvenue, " . $_SESSION['name'] . " !</h2>\n",
    "en" => "<h2>Welcome, " . $_SESSION['name'] . "!</h2>\n"
  ]);
} else {
  echo localized_msg([
    "fr" => "<h2>Bienvenue !</h2>\n",
    "en" => "<h2>Welcome!</h2>\n"
  ]);
}
?>

<p>Test...</p>

<?php include_once('include/footer.php'); ?>
