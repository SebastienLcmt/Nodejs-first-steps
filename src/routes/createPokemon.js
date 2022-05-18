const { ValidationError, UniqueConstraintError } = require('sequelize') // on importe les Validations sequelize
const { Pokemon } = require('../db/sequelize') // on importe le model
const auth = require('../auth/auth')
  
module.exports = (app) => { // on exporte une fonction qui prend en paramètre l'application express
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été créé`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError) return res.status(400).json({message: error.message, data: error})
        if(error instanceof UniqueConstraintError) return res.status(400).json({message: error.message, data: error})
        const message = `Le pokémon n'a pas pu être ajouté. Réessayer dans quelques instants`;
        res.status(500).json({message, data: error})
      })
  })
}