<?php
    require_once("action/HistoryAction.php");

	$action = new HistoryAction();
    $data = $action->execute();
    
	require_once("partial/header.php");
?>

<div class="HistoryPage">

<?php
	foreach ($data["histories"] as $history){ ?>

	<div>
		<div><?= $history["nomjoueur"] ?></div>
		<div><?= $history["nomadversaire"] ?></div>
        <div><?= $history["datepartie"] ?></div>
		<div><?= $history["nomgagnant"] ?></div>
	</div>
	
	<?php
	}
?>

</div>

<?php
	require_once("partial/footer.php");
