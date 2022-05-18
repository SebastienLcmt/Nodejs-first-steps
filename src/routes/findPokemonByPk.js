const { Pokemon } = require('../db/sequelize') // on importe le model
const auth = require('../auth/auth')
  
module.exports = (app) => { // on exporte une fonction qui prend en paramètre l'application express
  app.get('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)   // plus besoin de la méthode parseInt comme avec le routeur d'express
      .then(pokemon => {
        if(pokemon === null){
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre id`;
          return res.status(404).json({message})
        }
        const message = 'Un pokémon sauvage apparait'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Le pokémon n'a pas pu être récupérée. Réessayer dans quelques instants`;
        res.status(500).json({message, data: error})
      })
  })
}