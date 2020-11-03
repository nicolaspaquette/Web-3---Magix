<?php
    require_once("action/CommonAction.php");
    
	class AjaxChoiceAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];
			$data["type"] = $_POST["choice"];

			if (!empty($data["type"])){
				$result = parent::callAPI("games/action", $data);
			}

			return compact("result");
		}
	}