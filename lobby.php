<?php
	require_once("action/LobbyAction.php");

	$action = new LobbyAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>

<div class="lobbyPage">

    <div class="lobby">
        
        <form action="" method="POST">

            <button class="buttonLobby" type="submit" name="Pratiquer">Pratique</button>
            <input class="input" type="text" name="code" placeholder="Clé privée (optionnel)">
            <button class="buttonLobby" type="submit" name="Jouer">Jouer</button>
            <button class="buttonLobby" type="submit" name="Quitter">Quitter</button>

        </form>

        <form action="" method ="POST">

            <input class="input" type="text" name="nomJoueur" placeholder="Nom du joueur" required>
            <button class="buttonLobby" type="submit" name="Observer">Observer</button>
            <button class="buttonLobby" type="submit" name="Historique">Historique</button>

        </form>

        <?php
                if ($data["logoutError"] == true){
                    ?>
                    <p style="color: red;">ERREUR DE DÉCONNEXION</p> 
                    <?php
                }
                else if ($data["gameError"] == true){
                    ?>
                    <p style="color: red;">ERREUR DE CONNEXION AU JEU</p> 
                    <?php
                }
                else if ($data["observeError"] == true){
                    ?>
                    <p style="color: red;">ERREUR DE CONNEXION POUR OBSERVER UN JOUEUR</p> 
                    <?php
                }
        ?>

        <iframe onload="applyStyles(this)"
                src=<?="https://magix.apps-de-cours.com/server/#/chat/".$data["key"]."/large"?>>
        </iframe>

    </div>

    <div class="Minsc">
        <p>Take heart fellow adventurers, <br>
            for you have curried the favor of Boo, <br>
            the only miniature giant space <br>
            hamster in the Realm! <br> <br>
        </p>
    </div>

</div>

<?php
	require_once("partial/footer.php");
