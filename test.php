<?php
include_once('include/session.php');
$page_title = "Page de Test";
include_once('include/header.php');
?>
<h2>Informations internes</h2>

<?php
  echo "<p>Session :</p><pre>";
  print_r ($_SESSION);
  echo "</pre>\n";
  echo "<p>Cookie :</p><pre>";
  print_r (session_get_cookie_params());
  echo "</pre>\n";
?>

<hr />
<h2>Test de styles de messages</h2>

<p>Test de texte <strong>gras</strong>, <em>italique</em>, <strong><em>gras italique</em></strong>, <a href="#">lien</a>.</p>
<p class="note_box">Ceci est une note sans importance particulière.  Classe "note_box".<br />Test <strong>gras</strong>, <em>italique</em>, <strong><em>gras italique</em></strong>, <a href="#">lien</a>.</p>
<p class="info_box">Ceci est un message informatif potentiellement important.  Classe "info_box".<br />Test <strong>gras</strong>, <em>italique</em>, <strong><em>gras italique</em></strong>, <a href="#">lien</a>.</p>
<p class="error_box">Ceci est un message d'erreur.  Classe "error_box".  Et un peu de texte supplémentaire pour vérifier l'alignement vertical de l'image lorsque le texte fait plusieurs lignes.  J'aurais pu mettre un <a href="http://fr.wikipedia.org/wiki/Faux-texte">lorem ipsum</a> mais c'est tout aussi amusant de mettre du texte inutile pour faire du remplissage.<br />Test <strong>gras</strong>, <em>italique</em>, <strong><em>gras italique</em></strong>, <a href="#">lien</a>.</p>

<?php include_once('include/footer.php'); ?>
