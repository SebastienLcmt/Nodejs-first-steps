# Node JS 

- Permet d'exécuter du Javascript côté serveur
- Donc de lire, modifier, supprimer, .. des fichiers
- Communiquer avec une base de données

Quand utiliser Node.js
- Pour faire un site simple
- Pour faire une Api
- Très bien pour des services en temps réels, et demandant beaucoup de connexions simultanées (comme des chats, streaming, jeux, trading par exemple)



### Middleware

Pour les Middleware installés, next() est automatiquement exécuté.

- ```npm install morgan --save-dev``` // middleware pour logger requete
- ```js
    const morgan = require('morgan')
    ```

- ```npm install body-parser --save``` // pour parser toutes les données entrante
- ```js
    const bodyParser = require('body-parser')
    ```

### Installation ORM 

ORM Sequelize, pour intérargir avec la BDD depuis l'API

- ```npm install sequelize --save```
- ```npm install mariadb --save```  // Avec xampp on a MariaDB, donc on installe le driver adequat

### Les codes de status
- 1xx: informations sur le protocole de transfert. Métadonnées
- 2xx: succès
- 3xx: redirection 
- 4xx: Erreur du client. 401 pas autorisé. 404: ressource n'existe pas
- 5xx: le serveur n'est pas en mesure de fournir une réponse au client

Les types d'erreurs clients:
- 400: par exemple il a pas envoyé les bonnes ressources
- 404: ressource non existante
- 401: n'a pas l'autorisation 
- 403: authentifié, mais n'a pas l'autorisation 

### Validateurs sequelize

https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

### Model querying // operators

https://sequelize.org/docs/v6/core-concepts/model-querying-basics/


### Authentification

- ```npm install bcrypt--save```

JWT = json web token
A une durée de validité dans le temps

- ```npm install jsonwebtoken --save```