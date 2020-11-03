<?php
    require_once("action/CommonAction.php");
    
	class AjaxChoiceAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];

			if ($_POST["choice"] == "HERO_POWER" || $_POST["choice"] == "END_TURN"){
				$data["type"] = $_POST["choice"];
			}
			else if ($_POST["choice"] == "PLAY"){
				$data["type"] = $_POST["choice"];
				$data["uid"] = $_POST["uid"];
			}
			else if ($_POST["choice"] == "ATTACK"){
				$data["type"] = $_POST["choice"];
				$data["uid"] = $_POST["uid"];
				$data["targetuid"] = $_POST["targetuid"];
			}
			
			if (!empty($data["type"])){
				$result = parent::callAPI("games/action", $data);
			}

			return compact("result");
		}
	}