<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>

<form action="login.php" method="post">
    <div>
        <input type="text" name="username" placeholder="username" required>
    </div>

    <div>
        <input type="password" name="password" placeholder="password" required>
    </div>

    <div>
		<button type="submit">Connexion</button>
	</div>
</form>

<div>
    <?php
        if ($data["loginError"] == TRUE){
            ?>
               <p style="color: red;">ERREUR DE CONNEXION</p> 
            <?php
        }
    ?>
</div>

<?php
	require_once("partial/footer.php");
