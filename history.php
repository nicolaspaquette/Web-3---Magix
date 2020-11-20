<?php
    require_once("action/HistoryAction.php");

	$action = new HistoryAction();
    $data = $action->execute();
    
	require_once("partial/header.php");
?>

<div class="historyPage">

	<h1>Historique des dix dernières parties</h1>

	<div class="historyBox">
		<div class="historyNames">
			<div class="historyName">Nom du joueur</div>
			<div class="historyName">Nom de l'adversaire</div>
			<div class="historyName">Date</div>
			<div class="historyName">Nom du gagnant</div>
		</div>
	<?php
		foreach ($data["histories"] as $history){ ?>

		<div class="history">
			<div class="entry"><?= $history["nomjoueur"] ?></div>
			<div class="entry"><?= $history["nomadversaire"] ?></div>
			<div class="entry"><?= $history["datepartie"] ?></div>
			<div class="entry"><?= $history["nomgagnant"] ?></div>
		</div>
		
		<?php
		}
	?>

	</div>

</div>

<?php
	require_once("partial/footer.php");
