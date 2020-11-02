<?php
	require_once("action/GameAction.php");

	$action = new GameAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>
	<script type="text/javascript" src="js/game.js"></script>
    
<div class="game">
	<div class="enemy">

		<div class="enemyCardsInHand"></div>

		<div class="enemyPortrait">
			<div class="enemyName"></div>
			<div class="portrait"></div>
			<div class="enemyClass"></div>
		</div>

		<div class="enemyHealth">
			<p class="enemyHealthValue"></p>
		</div>

		<div class="enemyMana">
			<p class="enemyManaValue"></p>
		</div>

		<div class="enemyCardsInDeck">
			<p class="enemyCardsInDeckValue"></p>
		</div>

	</div>

	<div class="board">

		<div class="chatBox">
			<iframe class="gameChat" onload="applyStyles(this)" src=<?="https://magix.apps-de-cours.com/server/#/chat/".$data["key"]."/large" ?>></iframe>
		</div>

		<div class="battlefield">
			<div class="welcomeText"></div>
		</div>

		<div class="battlefieldBorder"></div>

	</div>

	<div class="player">

		<div class="playerCardsInDeck">
			<p class="playerCardsInDeckValue"></p>
		</div>

		<div class="playerMana">
			<p class="playerManaValue"></p>
		</div>

		<div class="playerHealth">
			<p class="playerHealthValue"></p>
		</div>

		<div class="playerCardsInHand">

			<template class="template">
				<div class="cardCost"></div>
				<div class="cardImage"></div>
				<div class="cardMechanics"></div>
				<div class="cardATK"></div>
				<div class="cardHP"></div>
			</template>

		</div>

		<div class="playerButtons">
			<button class="playerButton" type="submit" name="heroPower">Hero Power</button>
			<button class="playerButton" type="submit" name="endTurn">End Turn</button>
			<button class="playerButton" type="submit" name="chat" onclick="showHideChat()">Show/Hide Chat</button>

		</div>
	</div>

</div>

<?php
	require_once("partial/footer.php");
