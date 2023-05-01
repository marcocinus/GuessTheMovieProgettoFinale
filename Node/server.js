import express from "express";
import cors from "cors";
import db from "./app/config/config.js";
import routes from "./app/src/routes/routes.js";
import Movie from "./app/src/models/movie.js";

const PORT = 1234;

const app = express(); //Crea applicazione express
app.use(express.json()); //Il formato dati che andremo ad utilizzare sarà JSON 
app.use(cors()); //Se arriva una richiesta da localhost diversi verso questa porta sei autorizzato a servirla
app.use(routes); //Raccogliamo le rotte nel file routes dove sono specificate

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

try {
  await db.authenticate();
  console.log("Database connection has been established successfully");
} catch (error) {
  console.error("Unable to connect to the database: ", error);
}

await Movie.sync();

db.sync({ alter: true });
db.sync();
//db.sync({
//  models: [Rating, Review],
//});
