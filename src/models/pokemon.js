// L'objet sequelize contient une méthode define permettant de définir un model

// Cette méthode define prends 3 paramètres
// - Le nom du model, ici 'Pokemon' (sequelize créera donc la table pokemons(avec un s) dans notre BDD)
// - La description de notre model. Chaque propriété correspond à une colonne de la table
// - Le dernier paramètre est facultatif (timestamp)

const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Electrik', 'Normal', 'Vol', 'Fée'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER, // Datatypes pour typer la donnée
        primaryKey: true,  // clé unique
        autoIncrement: true // auto incrémenter la clé unique
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris"
        },
        validate: {
          notEmpty: { msg : "Le nom du Pokémon ne peut pas être une chaine de caractère vide"},
          notNull: { msg : "Le nom du Pokémon est une propriété requise"}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt: {msg : "N'utilisez que des nombres entiers pour les points de vie"},
          notNull : { msg : "Les points de vie sont une propriété requise."},
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égaux à 0."
          },
          max: {
            args: [999],
            msg: "Les points de vie ne doivent pas dépasser 999."
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt: {msg : "N'utilisez que des nombres entiers pour les points de dégâts"},
          notNull : { msg : "Les points de dégats sont une propriété requise."},
          min: {
            args: [0],
            msg: "Les points de dégats doivent être supérieurs ou égaux à 0."
          },
          max: {
            args: [99],
            msg: "Les points de dégâts ne doivent pas dépasser 99."
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          isUrl: {msg : "L'Url n'est pas valide"},
          notNull : { msg : "L'image est une propriété requise."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',') // On transforme la string en BDD en tableau
        },
        set(types){ // on passe en argument les types qu'on recevra lors d'un create ou update
           this.setDataValue('types', types.join()) // Dans la colonne types, on prend notre tableau que l'on join pour en faire une string
        },
        validate: {
          isTypesValid(value){
            if (!value){
              throw new Error ('Un pokémon doit au moins avoir un type.')
            }
            if (value.split(',').length > 3){
              throw new Error ('Un pokémon ne peut pas avoir plus de 3 types.')
            }
            value.split(',').forEach(element => {
              if(!validTypes.includes(element)){
                throw new Error (`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes.join(' ')}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created', // automatiquement par mariadb // ici on renomme createdAt par created grâce à sequelize
      updatedAt: false  // automatiquement par mariadb // on désactive cette information
    })
  }


  