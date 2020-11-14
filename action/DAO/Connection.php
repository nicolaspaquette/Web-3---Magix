<?php

    class Connection {
        private static $connection = null;

        // Design pattern : Singleton
        public static function getConnection () {
            if (Connection::$connection == null) {
                Connection::$connection = new PDO("pgsql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
                Connection::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                Connection::$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }

            return Connection::$connection;
        }
    }