const { Sequelize, DataTypes }  = require('sequelize'); // on import DataTypes pour définir les types des propriétés de nos models
const PokemonModel = require('../models/pokemon') // on importe notre model
const UserModel = require('../models/user') 
let pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')


// Connexion BDD
const sequelize = new Sequelize(
    'pokedex',  // nom BDD, à créer dans phpmyadmin
    'root', // nom utilisateur xampp
    '', // mot de passe xampp
    {
      host: 'localhost', 
      dialect: 'mariadb', // le driver 
      dialectOptions: {
      timezone: 'Etc/GMT-2', 
    },
    logging: false //deprecated si true
  })


const Pokemon = PokemonModel(sequelize, DataTypes) // on instancie notre model. C'est ici que sequelize crée notre table pokemon associé à ce model
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force : true}) // on synchronise notre demande avec l'état de la base de donnée. L'option force supprime la table à chaque redémarrage de l'api. Bien pour le développement  
  .then(()=> {
      pokemons.map(pokemon => {
        Pokemon.create({ // création des pokemon
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types
        }).then(pokemon => console.log(pokemon.toJSON())) // sequelize nous envoie plein de données, donc toJSON() si on ne souhaite qu'afficher l'essentiel
      })
// La méthode hash prends 2 paramètre: Le mot de passe, et un nombre entier (le salt)
      bcrypt.hash('pikachu', 10)
      .then(hash => { 
        User.create({
          username: "pikachu",
          password: hash
        })
      })
      // .then((user => console.log("L'utilisateur pikachu a bien été créé")))


      // console.log("La base de donnée a bien été initialisée");
    })
}

module.exports = {
  initDb, Pokemon, User
}