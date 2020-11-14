<?php    
	require_once("action/AjaxChoiceAction.php");

	$action = new AjaxChoiceAction();
	$data = $action->execute();
	
	echo json_encode($data["result"]);
