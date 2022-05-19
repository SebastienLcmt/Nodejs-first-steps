const express = require('express');
const favicon = require('serve-favicon') // middleware serve-favicon
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;

// Pour setup les middlewares dans express: app.use(middleware)
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json()) // on parse toutes les données entrantes vers l'api rest

sequelize.initDb() 


// **** Endpoints

// Raccourci de syntaxe à la place de :
// const findAllPokemons = require('./src/routes/findAllPokemons')
// findAllPokemons(app)
require('./src/routes/findAllPokemons')(app) 
require('./src/routes/findPokemonByPk')(app) 
require('./src/routes/createPokemon')(app) 
require('./src/routes/updatePokemon')(app) 
require('./src/routes/deletePokemon')(app) 
require('./src/routes/login')(app) 

// Gestion des erreurs 404

app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée. Essayez une autre URL."
    res.status(404).json(message)
})


app.listen(port, () => console.log(`Application démarrée sur localhost:${port}`))

