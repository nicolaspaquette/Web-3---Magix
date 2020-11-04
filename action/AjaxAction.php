<?php
    require_once("action/CommonAction.php");
    
	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];

			if ($_SESSION["game"] == "PLAY"){

				$result = parent::callAPI("games/state", $data);

				if ($result == "INVALID_KEY"){
					header("location:lobby.php");
                    exit;
				}
				else{
					return compact("result");
				}		
			}
			else if ($_SESSION["game"] == "WATCH"){

				$data["username"] = $_SESSION["nomJoueur"];
				$result = parent::callAPI("games/observe", $data);

				if ($result == "INVALID_KEY"){
					header("location:lobby.php");
                    exit;
				}
				else{
					return compact("result");
				}
			}
		}
	}