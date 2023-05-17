import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "guessthemovie",
  username: "root", //inserire il proprio username
  password: "pigna1839", //inserire la propria password
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
