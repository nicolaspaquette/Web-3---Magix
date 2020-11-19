<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/HistoryDAO.php");
    
	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {

			$data = [];
			$data["key"] = $_SESSION["key"];

			if ($_SESSION["game"] == "PLAY"){

				if ($_POST["nomGagnant"] != null && $_POST["counter"] == 1){
					$nomJoueur = $_SESSION["username"];
					$nomAdversaire = $_POST["nomAdversaire"];
					
					if ($_POST["nomGagnant"] == "nomJoueur"){
						$nomGagnant = $nomJoueur;
					}
					else if ($_POST["nomGagnant"] == "nomAdversaire"){
						$nomGagnant = $nomAdversaire;
					}
					
					HistoryDAO::addHistory($nomJoueur, $nomAdversaire, $nomGagnant);
				}

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