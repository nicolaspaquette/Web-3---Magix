const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
    })
.then(response => response.json())
.then(data => {
    console.log(data); // contient les cartes/état du jeu.
    
    if(data != "WAITING" && data != "LAST_GAME_WON" && data != "LAST_GAME_LOST"){
        document.querySelector(".playerHealthValue").innerHTML = data["hp"];
        document.querySelector(".playerCardsInDeckValue").innerHTML = data["remainingCardsCount"];
        document.querySelector(".playerManaValue").innerHTML = data["mp"];

        document.querySelector(".enemyHealthValue").innerHTML = data["opponent"]["hp"];
        document.querySelector(".enemyCardsInDeckValue").innerHTML = data["opponent"]["remainingCardsCount"];
        document.querySelector(".enemyManaValue").innerHTML = data["opponent"]["mp"];
        document.querySelector(".enemyName").innerHTML = data["opponent"]["username"];
        document.querySelector(".enemyClass").innerHTML = data["opponent"]["heroClass"];

        document.querySelector(".welcomeText").innerHTML = data["opponent"]["welcomeText"];
        setTimeout(function(){ 
            document.querySelector(".welcomeText").innerHTML = '';
            document.querySelector(".welcomeText").style.display = "none";
        }, 3000);

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

            document.querySelector(".playerCardsInHand").appendChild(div);
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
