import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "guessthemovieprova",
  username: "root",
  password: "aprile1993",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
