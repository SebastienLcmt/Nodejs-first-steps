const { Pokemon } = require("../db/sequelize"); // on importe le model
const { Op } = require("sequelize"); // opérateur de sequelize
const auth = require('../auth/auth')

module.exports = (app) => {
  // on exporte une fonction qui prend en paramètre l'application express
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;  // 5 par défaut
      
      if(name.length < 3) {
        const message = "Votre recherche doit contenir au moins 3 lettres";
        return res.status(400).json({ message }) } 

      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // tous les opérateurs se mettent entre crochets.
          },
        },
        order: ['name'],
        limit: limit
      }).then(({ count, rows }) => { // count & rows sont des noms imposés. 
        const message = `Il y a ${count} pokemon(s) correspondant au terme de recherche '${name}'`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques instants`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
