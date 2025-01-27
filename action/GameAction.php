<?php
	require_once("action/CommonAction.php");
	
	class GameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {

            if (empty($_SESSION["key"])){
				header("location:login.php");
                exit;
            }
            
			$title = "Game";
			$key = $_SESSION["key"];
			
            
			return compact("title", "key");
        }
	}
