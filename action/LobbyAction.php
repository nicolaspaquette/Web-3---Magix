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
			$gameError = false;
			$observeError = false;
			$key = $_SESSION["key"];
			$username = $_SESSION["username"];

			if (isset($_POST["Pratiquer"]) || isset($_POST["Jouer"]) || isset($_POST["Pratiquer2v1"]) || isset($_POST["Jouer2v1"])){
				$data = [];
				$data["key"] = $_SESSION["key"];

				if (isset($_POST["Pratiquer"]) || isset($_POST["Pratiquer2v1"])){
					$data["type"] = "TRAINING";
				}
				else if ((isset($_POST["Jouer"]) || isset($_POST["Jouer2v1"])) && !empty($_POST["code"])){
					$data["type"] = "PVP";
					$data["privateKey"] = $_POST["code"];
				}
				else if (isset($_POST["Jouer"]) && empty($_POST["code"])){
					$data["type"] = "PVP";
				}

				if (isset($_POST["Pratiquer2v1"]) || isset($_POST["Jouer2v1"])){
					$data["mode"] = "COOP";
				}
				else{
					$data["mode"] = "STANDARD";
				}
			
				$result = parent::callAPI("games/auto-match", $data);

				if ($result == "INVALID_KEY" || $result == "INVALID_GAME_TYPE" || $result == "DECK_INCOMPLETE" || $result == "MAX_DEATH_THRESHOLD_REACHED"){
					$gameError = true;
                }
                else if ($result == "JOINED_PVP" || $result == "CREATED_PVP" || $result == "JOINED_TRAINING"){
					$_SESSION["game"] = "PLAY";
                    header("location:game.php");
                    exit;
                }				
			}
			else if (isset($_POST["Quitter"])){
				$data = [];
				$data["key"] = $_SESSION["key"];

				$result = parent::callAPI("signout", $data);

				if ($result == "INVALID_KEY"){
					$logoutError = true;

					header("location:login.php");
                    exit;
                }
                else {
                    unset($_SESSION["key"]);

                    header("location:login.php");
                    exit;
                }
			}
			else if (isset($_POST["Observer"]) && !empty($_POST["nomJoueur"])){
				$data = [];
				$data["key"] = $_SESSION["key"];

				$data["username"] = $_POST["nomJoueur"];
				$result = parent::callAPI("games/observe", $data);

				if ($result == "INVALID_KEY"){
                    $observeError = true;
				}
				else{
					$_SESSION["game"] = "WATCH";
					$_SESSION["nomJoueur"] = $_POST["nomJoueur"];
					header("location:game.php");
                    exit;
				}
                
			}
			else if (isset($_POST["Historique"])){
				header("location:history.php");
				exit;
			}
			
			return compact("logoutError", "title", "key", "gameError", "observeError", "username");
        }
	}
