<?php
	require_once("action/CommonAction.php");
	
    $result = parent::callAPI("signout", $_SESSION["key"]);
    
