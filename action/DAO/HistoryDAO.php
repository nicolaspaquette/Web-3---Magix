<?php
    require_once("action/DAO/Connection.php");


    class HistoryDAO {

        public static function getHistory() {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * FROM magix");
            $statement->setFetchMode(PDO::FETCH_ASSOC); // retourne les données comme un dictionnnaire. Ex : $line["username"]
            $statement->execute();  

            return $statement->fetchAll();
        }

        public static function addHistory($nomJoueur, $nomAdversaire, $datePartie, $nomGagnant){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO magix VALUES (DEFAULT, ?, ?, ?, ?);");
            $statement->bindParam(1, $nomJoueur);   
            $statement->bindParam(2, $nomAdversaire);
            $statement->bindParam(3, $datePartie);   
            $statement->bindParam(4, $nomGagnant);  

            $statement->execute(); 
        }

    }