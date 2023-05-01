import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Movie = db.define('movie', {
  userId: {
    type: DataTypes.STRING
  },
  movieId: {
    type: DataTypes.STRING
  },
  movieTitle: { //Aggiungi la colonna movieTitle
    type: DataTypes.STRING
  },
  moviePoster: { //Aggiungi la colonna moviePoster
    type: DataTypes.STRING
  },
  actors: {
    type: DataTypes.STRING
  },
  director: {
    type: DataTypes.STRING
  },
  genre: {
    type: DataTypes.STRING
  },
  overview: {
    type: DataTypes.STRING(3000)
  },
  releaseDate: {
    type: DataTypes.STRING
  },
  comment: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  },
  time: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});

export default Movie;