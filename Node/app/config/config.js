import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "guessthemovie",
  username: "username", //inserire il proprio username
  password: "password", //inserire la propria password
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
