<?php
	require_once("action/LobbyAction.php");

	$action = new LobbyAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>

<div class="lobby">
    
    <form action="" method="POST">

        <button class="buttonLobby" type="submit" name="Pratiquer">Pratique</button>
        <button class="buttonLobby" type="submit" name="Jouer">Jouer</button>
        <button class="buttonLobby" type="submit" name="Quitter">Quitter</button>

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
    ?>

    <iframe style="width:700px;height:240px; margin-bottom: 1em;" onload="applyStyles(this)"
            src=<?="https://magix.apps-de-cours.com/server/#/chat/".$data["key"]?>>
    </iframe>

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
