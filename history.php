<?php
    require_once("action/HistoryAction.php");

	$action = new HistoryAction();
    $data = $action->execute();
    
	require_once("partial/header.php");
?>

<div class="historyPage">

	<div class="historyBox">

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
