<?php
    require_once("action/HistoryAction.php");

	$action = new HistoryAction();
    $data = $action->execute();
    
	require_once("partial/header.php");
?>

<div class="HistoryPage">

<?php
	foreach ($data["histories"] as $history){ ?>

		<div><?= $history["nomJoueur"] ?></div>
		<div><?= $history["nomAdversaire"] ?></div>
        <div><?= $history["datePartie"] ?></div>
		<div><?= $history["nomGagnant"] ?></div>

	<?php
	}
?>

</div>

<?php
	require_once("partial/footer.php");
