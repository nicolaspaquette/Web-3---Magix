<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/HistoryDAO.php");

    class HistoryAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $histories = AnswerDAO::getAnswer();
            return compact("histories");
        }
    }