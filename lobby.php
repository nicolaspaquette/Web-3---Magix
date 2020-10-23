<?php
	require_once("action/LoginAction.php");

	$action = new LobbyAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>

<div>lobby</div>

<?php
	require_once("partial/footer.php");
