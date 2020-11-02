<?php
	require_once("action/CommonAction.php");
	
	class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }
        
		protected function executeAction() {
            $title = "Login";
            $loginError = false;
            $username = "";

			if (isset($_POST["username"]) and isset($_POST["password"])) {
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];

                $_SESSION["username"] = $_POST["username"];
                $username = $_POST["username"];

                $result = parent::callAPI("signin", $data);
                
                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $loginError = true;
                }
                else {
                    // Pour voir les informations retournées : var_dump($result);exit;
                    $key = $result->key;
                    $_SESSION["key"] = $key;

                    header("location:lobby.php");
                    exit;
                }
            }
            return compact("loginError", "title", "username");
        }
	}
