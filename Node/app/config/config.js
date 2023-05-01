import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "guessthemovie",
  username: "root",
  password: "52ee06cc46e2015475a880ff2b89dfd8644d48c9aae770634c0fb2f329eb6ad5",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
