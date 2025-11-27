- Tables
  GET /tables => Récupères toutes les tables
  GET /tables/:id => Récupère une table par rapport à son id
  POST /tables/:id/join => Permet de rejoindre une table
  DELETE /tables/:id/leave => Permet de quitter une table
  <br><br>
- POST /tables/:id/game/start => Pour lancer la partie
  POST /tables/:id/game/action => Pour faire une action. Exemple de body : { "action": "RAISE", "amount": 50 } ou { "
  action": "FOLD" }
  GET /tables/:id/game => Pour voir le jeu
  <br><br>
- Players
  GET /players => Récupères tous les joueurs
  GET /players/:id => Récupère un joueur par rapport à son id
  POST /players/deposit => somme à ajouté en début de jeu
  <br><br>
- Auth
  POST /auth/login => Permet la connexion
  GET /auth/profile => Permet de récupérer les informations via un bearer token
  POST /auth/register => Permet la création d'un compte (pas sûr de mettre)
  <br><br>
- Game
  GET /game => Récupérer l'état du jeu
  POST /game/:action => Lance le jeu par rapport à une action

<br><br>

1. **✓** - Liste des routes actives au sein de votre README.
2. **✓** - Un joueur peut se créer un compte, automatiquement une cave de 1000€ lui est allouée.
3. **≈** - Un joueur peut s'inviter à une table. S'il est seul, automatiquement une IA se joint à la table.
4. **≈** - Génération des cartes et distribution aléatoire (2 cartes par joueur)
5. **x** - Implémentation des règles pour les blindes et pour les mises.
6. **x** - Dès qu'un utilisateur augmente sa mise, son solde est actualisé (donc décrémenté en toute logique) au sein de la
BDD.
7. **✓** - Mise en place d'une authentification via jeton JWT<br>
8. **✓** - Mise en place d'un swagger documentant les routes accessibles ainsi que les erreurs potentielles