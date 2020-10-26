<?php
	require_once("action/LobbyAction.php");

	$action = new LobbyAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>
    
<form action="" method="POST">

    <button type="submit" name="Pratiquer">Pratique</button>
    <button type="submit" name="Jouer">Jouer</button>
    <button type="submit" name="Quitter">Quitter</button>

</form>

<?php
        if ($data["logoutError"] == TRUE){
            ?>
               <p style="color: red;">ERREUR DE DÉCONNEXION</p> 
            <?php
        }
?>

<iframe style="width:700px;height:240px;" onload="applyStyles(this)"
        src=<?="https://magix.apps-de-cours.com/server/#/chat/".$_SESSION["key"] ?>>
</iframe>

<?php
	require_once("partial/footer.php");
