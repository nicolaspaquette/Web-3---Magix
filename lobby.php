<?php
	require_once("action/LobbyAction.php");

	$action = new LobbyAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>
    <script type="text/javascript" src="js/chat.js"></script>
        <title>Lobby</title>
    </head>
<body>

<button>Pratique</button>
<button>Jouer</button>
<button onclick="deconnexion()">Quitter</button>

    <script>
        const deconnexion = () =>{
            fetch("deconnexion.php");
        }
    </script>

<iframe style="width:700px;height:240px;" onload="applyStyles(this)"
        src=<?="https://magix.apps-de-cours.com/server/#/chat/".$_SESSION["key"] ?>>
</iframe>

<?php
	require_once("partial/footer.php");
