let uidCardsInHand = null;
let uid = null;
let targetuid = null;
let attackingCard = null;
let attackedCard = null;

let newTurn = true;
let angle = 0;
let enemyEndTurn = false;

let nomJoueur = null;
let nomAdversaire = null;
let datePartie = null;
let nomGagnant = null;
let counter = 0;

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
    });

const state = () => {

    let formData = new FormData();
    formData.append("nomAdversaire", nomAdversaire);
    formData.append("nomGagnant", nomGagnant);
    formData.append("counter", counter);

    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include",
        body: formData
    })
.then(response => response.json())
.then(data => {

    if (typeof data !== "object"){
        if (data != "WAITING" ){

            if (data == "LAST_GAME_WON"){
                document.querySelector(".enemyHealthValue").innerHTML = "0";
                document.querySelector(".gameStatus").style.display = "flex";
                document.querySelector(".gameStatus").innerHTML = "YOU WON !";
                document.querySelector(".gameStatus").style.color = "green";

                nomGagnant = "nomJoueur";
                counter++;

                setTimeout(function(){ 
                    window.location.href = "lobby.php";
                }, 5000);
            }
            else if (data == "LAST_GAME_LOST"){
                document.querySelector(".playerHealthValue").innerHTML = "0";
                document.querySelector(".gameStatus").style.display = "flex";
                document.querySelector(".gameStatus").innerHTML = "YOU LOST !";
                document.querySelector(".gameStatus").style.color = "red";

                nomGagnant = "nomAdversaire";
                counter++;

                setTimeout(function(){ 
                    window.location.href = "lobby.php";
                }, 5000);
            }
            else if (data == "NOT_IN_GAME"){
                window.location.href = "lobby.php";
            }
        }
    }

    console.log(data); // contient les cartes/état du jeu.
    
    if(data != "WAITING" && data != "LAST_GAME_WON" && data != "LAST_GAME_LOST" && data != "NOT IN GAME"){

        nomAdversaire= data["opponent"]["username"];

        // temps pour le tour
        document.querySelector(".timer").innerHTML = data["remainingTurnTime"];

        if (data["yourTurn"] == true){
            document.querySelector(".timer").style.color = "green";
        }
        else{
            document.querySelector(".timer").style.color = "red";
        }

        // affichage des stats des 2 joueurs
        document.querySelector(".playerHealthValue").innerHTML = data["hp"];
        document.querySelector(".playerCardsInDeckValue").innerHTML = data["remainingCardsCount"];
        document.querySelector(".playerManaValue").innerHTML = data["mp"];

        document.querySelector(".enemyHealthValue").innerHTML = data["opponent"]["hp"];
        document.querySelector(".enemyCardsInDeckValue").innerHTML = data["opponent"]["remainingCardsCount"];
        document.querySelector(".enemyManaValue").innerHTML = data["opponent"]["mp"];
        document.querySelector(".enemyName").innerHTML = data["opponent"]["username"];
        document.querySelector(".enemyClass").innerHTML = data["opponent"]["heroClass"];

        // message de l'ennemi pour 3 secondes
        document.querySelector(".enemyWelcomeText").innerHTML = data["opponent"]["welcomeText"];
        document.querySelector(".playerWelcomeText").innerHTML = data["welcomeText"];
        setTimeout(function(){ 
            document.querySelector(".enemyWelcomeText").innerHTML = '';
            document.querySelector(".enemyWelcomeText").style.display = "none";

            document.querySelector(".playerWelcomeText").innerHTML = '';
            document.querySelector(".playerWelcomeText").style.display = "none";
        }, 3000);

        // cartes dans les mains du joueur
        document.querySelector(".playerCardsInHand").innerHTML = "";
        let templateHTML = document.querySelector("#template").innerHTML;
        let card = data["hand"];

        for (let i = 0; i < card.length; i++){
            let div = document.createElement("div");
            div.innerHTML = templateHTML;
            div.className = "card";

            div.querySelector(".cardCost").innerHTML = card[i].cost;
            div.querySelector(".cardMechanics").innerHTML = card[i].mechanics;
            div.querySelector(".cardATK").innerHTML = card[i].atk;
            div.querySelector(".cardHP").innerHTML = card[i].hp;
            div.querySelector(".carduid").innerHTML = card[i].uid;

            div.querySelector(".cardImage").style.backgroundImage = cardImage(card[i].cost);

            for (let j = 0; j < card[i].mechanics.length; j++){
                if (card[i].mechanics[j] == "Taunt"){
                    let taunt = document.createElement("div");
                    taunt.className = "cardTaunt";
                    div.appendChild(taunt);
                }
            }

            if (data["yourTurn"] == true){

                if (parseInt(data["mp"]) >= parseInt(card[i].cost)){
                    div.style.border = "2px solid green";

                    
                    div.addEventListener("click", () =>{
                        uidCardsInHand = parseInt(div.querySelector(".carduid").innerHTML);
                        playCard(uidCardsInHand);
                        uidCardsInHand = null;
                    });
                }
            }

            document.querySelector(".playerCardsInHand").appendChild(div);
        }

        // cartes dans les mains de l'ennemi
        document.querySelector(".enemyCardsInHand").innerHTML = "";
        for (let i = 0; i < data["opponent"]["handSize"]; i++){
            let div = document.createElement("div");
            div.className = "enemyCard";

            document.querySelector(".enemyCardsInHand").appendChild(div);
        }

        // click sur le portrait de l'ennemie pour l'attaquer
        document.querySelector(".portrait").addEventListener("click", () =>{
            targetuid = 0;
            attackedCard = targetuid;
            if (attackingCard != null && attackedCard == 0){
                attack(uid, targetuid);
                attackingCard = null;
                attackedCard = null;
                uid = null;
                targetuid = null;

                document.querySelector(".portrait").style.border = "5px solid red";
                setTimeout(function(){ 
                    document.querySelector(".portrait").style.border = "3px solid black";
                }, 1000);
            }
        });

        // cartes jouees par l'ennemi
        document.querySelector(".enemyBoard").innerHTML = "";
        templateHTML = document.querySelector("#template").innerHTML;
        card = data["opponent"]["board"];

        for (let i = 0; i < card.length; i++){
            let div = document.createElement("div");
            div.innerHTML = templateHTML;
            div.className = "card";

            div.querySelector(".cardCost").innerHTML = card[i].cost;
            div.querySelector(".cardMechanics").innerHTML = card[i].mechanics;
            div.querySelector(".cardATK").innerHTML = card[i].atk;
            div.querySelector(".cardHP").innerHTML = card[i].hp;
            div.querySelector(".carduid").innerHTML = card[i].uid;

            div.querySelector(".cardImage").style.backgroundImage = cardImage(card[i].cost);

            for (let j = 0; j < card[i].mechanics.length; j++){
                if (card[i].mechanics[j] == "Taunt"){
                    let taunt = document.createElement("div");
                    taunt.className = "cardTaunt";
                    div.appendChild(taunt);
                }
            }

            if (data["yourTurn"] == true){

                div.addEventListener("click", () =>{
                    targetuid = parseInt(div.querySelector(".carduid").innerHTML);
                    attackedCard = targetuid;

                    if (attackingCard != null && attackedCard != null){

                        div.style.border = "4px solid red";
                            setTimeout(function(){
                                if (div != null){
                                    div.style.border = "0px solid black";
                                } 
                            }, 1000);

                        attack(uid, targetuid);
                        attackingCard = null;
                        attackedCard = null;
                        uid = null;
                        targetuid = null;
                    }
                });
            }

            document.querySelector(".enemyBoard").appendChild(div);
        }

        // cartes jouees par le joueur
        document.querySelector(".playerBoard").innerHTML = "";
        templateHTML = document.querySelector("#template").innerHTML;
        card = data["board"];

        for (let i = 0; i < card.length; i++){
            let div = document.createElement("div");
            div.innerHTML = templateHTML;
            div.className = "card";

            div.querySelector(".cardCost").innerHTML = card[i].cost;
            div.querySelector(".cardMechanics").innerHTML = card[i].mechanics;
            div.querySelector(".cardATK").innerHTML = card[i].atk;
            div.querySelector(".cardHP").innerHTML = card[i].hp;
            div.querySelector(".carduid").innerHTML = card[i].uid;

            div.querySelector(".cardImage").style.backgroundImage = cardImage(card[i].cost);

            for (let j = 0; j < card[i].mechanics.length; j++){
                if (card[i].mechanics[j] == "Taunt"){
                    let taunt = document.createElement("div");
                    taunt.className = "cardTaunt";
                    div.appendChild(taunt);
                }
            }

            if (data["yourTurn"] == true){

                if (card[i].state == "IDLE"){
                    div.style.border = "2px solid yellow";
                }

                div.addEventListener("click", () =>{
                    uid = parseInt(div.querySelector(".carduid").innerHTML);
                    attackingCard = uid;
                    readyToAttack = true;
                });

                if (parseInt(div.querySelector(".carduid").innerHTML) == uid){
                    div.style.border = "4px solid darkorange";
                }
            }

            document.querySelector(".playerBoard").appendChild(div);
        }

        // boutons utilisables ou non
        if (data["yourTurn"] == true){
            if (parseInt(data["mp"]) >= 2 && !data["heroPowerAlreadyUsed"]){
                document.querySelector(".heroPowerButton").style.border = "5px solid darkgreen";
            }
            else{
                document.querySelector(".heroPowerButton").style.border = "3px solid black";
            }
        }
        else{
            document.querySelector(".heroPowerButton").style.border = "3px solid black";
        }

        if (data["yourTurn"] == true){
            document.querySelector(".endTurnButton").style.border = "5px solid darkgreen";
        }
        else{
            document.querySelector(".endTurnButton").style.border = "3px solid black";
        }
    }

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

const showHideChat = () =>{
    if (document.querySelector(".gameChat").style.display != "none"){
        document.querySelector(".gameChat").style.display = "none";
    }
    else{
        document.querySelector(".gameChat").style.display = "block";
    }
}

let choice = "";

const heroPower = () =>{
    choice = "HERO_POWER";
    uid = null;
    targetuid = null;
    choice = gameChoice(choice, uid, targetuid);
}

const endTurn = () =>{
    choice = "END_TURN";
    uid = null;
    targetuid = null;
    choice = gameChoice(choice, uid, targetuid);
}

const playCard = (uid) =>{
    choice = "PLAY";
    targetuid = null;
    choice = gameChoice(choice, uid, targetuid);
}

const attack = (uid, targetuid) =>{
    choice = "ATTACK";
    choice = gameChoice(choice, uid, targetuid);
}

const gameChoice = (choice, uid, targetuid) =>{

    let formData = new FormData();
    formData.append("choice", choice);

    if (uid != null){
        formData.append("uid", uid);
    }

    if (targetuid != null){
        formData.append("targetuid", targetuid);
    }

    fetch("ajax-choice.php",{
        method: "POST",
        credentials: "include",
        body: formData
    })
    .then (response => response.json())
    .then(data =>{
        
        if (data == "INVALID_ACTION"){
            document.querySelector(".gameError").innerHTML = "Action invalide";
        }
        else if (data == "ACTION_IS_NOT_AN_OBJECT"){
            document.querySelector(".gameError").innerHTML = "Mauvaise structure de données";
        }
        else if (data == "NOT_ENOUGH_ENERGY"){
            document.querySelector(".gameError").innerHTML = "Pas assez d'énergie restante pour jouer la carte";
        }
        else if (data == "BOARD_IS_FULL"){
            document.querySelector(".gameError").innerHTML = "Pas assez de place sur le jeu";
        }
        else if (data == "CARD_NOT_IN_HAND"){
            document.querySelector(".gameError").innerHTML = "La carte n'est pas dans votre main";
        }
        else if (data == "CARD_IS_SLEEPING"){
            document.querySelector(".gameError").innerHTML = "La carte ne peut pas attaquer ce tour-ci";
        }
        else if (data == "MUST_ATTACK_TAUNT_FIRST"){
            document.querySelector(".gameError").innerHTML = "Vous devez attaquer la carte 'Taunt' en premier";
        }
        else if (data == "OPPONENT_CARD_NOT_FOUND"){
            document.querySelector(".gameError").innerHTML = "La carte attaquée n'est pas présente sur le jeu";
        }
        else if (data == "CARD_NOT_FOUND"){
            document.querySelector(".gameError").innerHTML = "La carte n'est pas présente";
        }
        else if (data == "ERROR_PROCESSING_ACTION"){
            document.querySelector(".gameError").innerHTML = "Erreur interne";
        }
        else if (data == "INTERNAL_ACTION_ERROR"){
            document.querySelector(".gameError").innerHTML = "Erreur interne";
        }
        else if (data == "HERO_POWER_ALREADY_USED"){
            document.querySelector(".gameError").innerHTML = "Pouvoir du héro déjà utilisé pour ce tour";
        }

        setTimeout(function(){ 
            document.querySelector(".gameError").innerHTML = '';
        }, 5000);
    })

    choice = "";
    return choice;
}

const cardImage = (cardCost) =>{
    let cardImage = "";

    if (cardCost == 1){
        cardImage = "url('./images/goblin.PNG')";
    }
    else if (cardCost == 2){
        cardImage = "url('./images/orc.png')";
    }
    else if (cardCost == 3){
        cardImage = "url('./images/mimic.jpeg')";
    }
    else if (cardCost == 4){
        cardImage = "url('./images/gelatinousCube.jpg')";
    }
    else if (cardCost == 5){
        cardImage = "url('./images/rakshasa.jpg')";
    }
    else if (cardCost == 6){
        cardImage = "url('./images/mindflayer.jpg')";
    }
    else if (cardCost == 7){
        cardImage = "url('./images/beholder.jpg')";
    }
    else if (cardCost == 8){
        cardImage = "url('./images/planatar.jpg')";
    }
    else if (cardCost == 9){
        cardImage = "url('./images/redDragon.jpg')";
    }
    else if (cardCost == 10){
        cardImage = "url('./images/tarrasque.jpg')";
    }
    else{
        cardImage = "url('./images/flumph.jpg')";
    }

    return cardImage;
}

const animateHourglass = () => {
    let hourglass = document.querySelector(".hourglass");

    angle+=4;
    hourglass.style.transform = "rotate(" + angle + "deg)";
}
