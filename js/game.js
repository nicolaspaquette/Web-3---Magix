let uidCardsInHand = null;
let uid = null;
let targetuid = null;
let attackingCard = null;
let attackedCard = null;

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
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

                setTimeout(function(){ 
                    window.location.href = "lobby.php";
                }, 5000);
            }
            else if (data == "LAST_GAME_LOST"){
                document.querySelector(".playerHealthValue").innerHTML = "0";
                document.querySelector(".gameStatus").style.display = "flex";
                document.querySelector(".gameStatus").innerHTML = "YOU LOST !";
                document.querySelector(".gameStatus").style.color = "red";

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

            if (card[i].cost == 1){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/goblin.jpg')";
            }
            else if (card[i].cost == 2){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/orc.jpeg')";
            }
            else if (card[i].cost == 3){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/intellectDevourer.png')";
            }
            else if (card[i].cost == 4){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/gelatinousCube.jpg')";
            }
            else if (card[i].cost == 5){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/rakshasa.jpg')";
            }
            else if (card[i].cost == 6){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/mindflayer.png')";
            }
            else if (card[i].cost == 7){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/beholder.jpg')";
            }
            else if (card[i].cost == 8){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/planatar.jpeg')";
            }
            else if (card[i].cost == 9){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/redDragon.jpg')";
            }
            else if (card[i].cost == 10){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/tarrasque.jpg')";
            }
            else{
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/flumph.jpg')"
            }

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

            if (card[i].cost == 1){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/goblin.jpg')";
            }
            else if (card[i].cost == 2){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/orc.jpeg')";
            }
            else if (card[i].cost == 3){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/intellectDevourer.png')";
            }
            else if (card[i].cost == 4){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/gelatinousCube.jpg')";
            }
            else if (card[i].cost == 5){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/rakshasa.jpg')";
            }
            else if (card[i].cost == 6){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/mindflayer.png')";
            }
            else if (card[i].cost == 7){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/beholder.jpg')";
            }
            else if (card[i].cost == 8){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/planatar.jpeg')";
            }
            else if (card[i].cost == 9){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/redDragon.jpg')";
            }
            else if (card[i].cost == 10){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/tarrasque.jpg')";
            }
            else{
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/flumph.jpg')"
            }

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

            if (card[i].cost == 1){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/goblin.jpg')";
            }
            else if (card[i].cost == 2){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/orc.jpeg')";
            }
            else if (card[i].cost == 3){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/intellectDevourer.png')";
            }
            else if (card[i].cost == 4){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/gelatinousCube.jpg')";
            }
            else if (card[i].cost == 5){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/rakshasa.jpg')";
            }
            else if (card[i].cost == 6){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/mindflayer.png')";
            }
            else if (card[i].cost == 7){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/beholder.jpg')";
            }
            else if (card[i].cost == 8){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/planatar.jpeg')";
            }
            else if (card[i].cost == 9){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/redDragon.jpg')";
            }
            else if (card[i].cost == 10){
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/tarrasque.jpg')";
            }
            else{
                div.querySelector(".cardImage").style.backgroundImage = "url('./images/flumph.jpg')"
            }

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

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

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

    fetch("ajax-action.php",{
        method: "POST",
        credentials: "include",
        body: formData
    })
    .then (response => response.json())
    .then(data =>{
    })

    choice = "";
    return choice;
}
