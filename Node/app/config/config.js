import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: " nome database creato ",
  username: " username ",
  password: " password ",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
