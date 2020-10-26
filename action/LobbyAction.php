<?php
	require_once("action/CommonAction.php");
	
	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {

			if (empty($_SESSION["key"])){
				header("location:login.php");
                exit;
			}

			$title = "Lobby";
			$logoutError = false;

			if (isset($_POST["Pratiquer"])){
				header("location:game.php");
				exit;
			}
			else if (isset($_POST["Jouer"])){
				header("location:game.php");
				exit;
			}
			else if (isset($_POST["Quitter"])){
				$data = [];
				$data["key"] = $_SESSION["key"];

				$result = parent::callAPI("signout", $data);

				if ($result == "INVALID_KEY"){
                    $logoutError = true;
                }
                else {
                    unset($_SESSION["key"]);

                    header("location:lobby.php");
                    exit;
                }
			}
			
			return compact("logoutError", "title");
        }
	}
