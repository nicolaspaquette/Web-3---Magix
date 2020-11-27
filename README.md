# Web 3 - Magix

## Le thème de mon jeu magix est Dungeons and Dragons, le jeu de table. Les différentes pages sont inspirées de l'univers du jeu. 

### Page 1 - Login

La page Login est inspirée des classiques rencontres dans les tavernes qui surviennent dans les contes et les épopées médiévales.
L'outil de prédilection lorsque l'on joue à Dungeons and Dragons (DnD) est le dé à 20 faces (d20).
J'ai donc décidé de répliquer le lancer du d20. 

Dans DnD, obtenir un 1 est un échec critique et un 20 est une réussite critique. 
Obtenir un de ses deux chiffres propose donc le fait de réussir et échouer une tâche précise.
J'ai donc afficher un message et un son lorsque vous tomber sur ses chiffres. 

Pour lancer le dé, il suffit de cliquer sur le dé et de maintenant le clique de souris enfoncé. On peut ensuite bouger le dé dans les alentours et celui-ci va bouger et tourner comme si on le brassait. 
Lâcher le clique de souris fait en sorte que le dé se lance, rebondissant et affichant un chiffre à la fin de son mouvement. 

La page Login sert aussi à s'identifier au jeu Magix. 
Important de noter qu'une fois identifier correctement, le nom d'usager en stocké en variable de session. 
Si on se déconnecte à partir de la page Lobby, le nom d'usager sera toujours présent. Il ne suffira que de rentrer le mot de passe à nouveau.

### Page 2 - Lobby

La page Lobby vous transporte à Baldur's Gate, l'une des villes mythiques de l'univers de DnD. 
Vous ferez la rencontre de Minsc, un des personnages de vous rencontrez dans le jeu Baldur's Gate 2 (jeu sorti en 2000).
Accompagné de son fidèle partenaire, Boo le hamster, vous l'affrontrez dans un combat enflammé !

Plusieurs options s'offrent à vous dans le menu:

* Pratique Solo: Jouez contre le AI
* Pratique Coop: Jouez avec le AI afin de tuer un ennemi commun

* Jouer Solo: Jouez contre un joueur en ligne ! (Les deux joueurs peuvent entrer le même mot de passe optionnel afin de joueur automatiquement l'un contre l'autre. Sinon, le choix est aléatoire)
* Jouer Coop: Jouez avec un autre joueur afin de vaincre un ennemi commun (mot de passe optionnel)

* Observer: Entrez le nom d'un joueur dans une partie et vous pourrez observer sa partie en cours ! (Vous pouvez voir seulement les créatures sur le champ de bataille, et non dans la main des joueurs)

* Historique: Regardez les résultats de 10 dernières parties jouées par vous !

* Quitter: Vous déconnecte et vous retourne à la page Login (et conserve votre nom d'utilisateur pour la prochain connexion)

### Page 3 - Game

Vous êtes maintenant sur le champ de bataille ! Vous affrontez Minsc dans un duel à mort !

Dans le bas à droite. Vous avez vos informations:
* Carte: nombre de cartes dans votre paquet de carte
* Dé: votre nombre de mana
* Potion: votre nombre de vie

Vos cartes sont dans le milieu de l'écran et les 3 boutons se trouvent dans le bas à droite
Les informations de l'adversaire sont en haut de l'écran

Le sablier à droite représente le temps restant pour le tour des joueurs.
Quand le nombre est vert, c'est votre tour
Quand le nombre est rouge, c'est le tour de votre adversaire

Bon Match !

### Page 4 - History

La page History présente les résultats des 10 dernières parties (du plus récent au plus vieux)

Voici la table dans PostgreSQL:

CREATE TABLE magix{
    id                  SERIAL,
    nomjoueur           VARCHAR(32),
    nomadversaire       VARCHAR(32),
    datepartie          DATE,
    nomgagnant          VARCHAR(32)
}
