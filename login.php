<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/dice.js"></script>

<div class="login">

        <p class="title">Magix</p>

        <form action="login.php" method="post" class="form">
            <div>
                <input class="input" type="text" name="username" placeholder="username" required
                    <?php
                        if (!empty($data["username"]) && $data["username"] != "Invité"){
                            ?>
                                value=<?=$data["username"]?>
                            <?php
                        }
                    ?>
                >
            </div>

            <div>
                <input class="input" type="password" name="password" placeholder="password" required>
            </div>

            <div>
                <button class="button" type="submit">Connexion</button>
            </div>
        </form>

        <div>
            <?php
                if ($data["loginError"] == TRUE){
                    ?>
                    <p style="color: red; font-size:40px; padding:0.5em">ERREUR DE CONNEXION</p> 
                    <?php
                }
            ?>
        </div>

        <p class="critical"></p>

        <div class="throwDice">
            <div class="dice"><p class="diceValue">10</p>
        </div>

</div>

<?php
	require_once("partial/footer.php");
