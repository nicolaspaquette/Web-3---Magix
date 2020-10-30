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
