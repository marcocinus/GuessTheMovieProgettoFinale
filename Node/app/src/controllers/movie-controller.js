import Movie from "../models/movie.js"; //Importo il modello game
import axios from "axios"; //Importo il pacchetto axios per semplificare le richieste http, in alternativa potrei usare la fetch

//Funzione asincrona per recuperare un film random da un array con i dati utili per iniziare il gioco
export const getRandomMovie = async (req, res) => {
  try {
    const randomMovie = await getRandomMovieByPages();
    const movieTitle = await getMovieTitle(randomMovie); //Utile per recuperare il titolo del film dal JSON della risposta dell'API
    const moviePoster = await getMoviePoster(randomMovie); //Recupera il poster
    const { actorsString, directorName } = await getAndTransformActorsAndDirectorInString(randomMovie);//Recupero i dati del cast per attori e regista e li trasformo da array in stringa
    const { genreString, releaseDate, overview } = await getMovieOtherDetails(randomMovie); //Recupero il genere, la data di rilascio e la trama
    //Creo un nuovo oggetto movie con i dati raccolti precedentemente
    const movie = addNewMovie(req, randomMovie, movieTitle, moviePoster, actorsString, directorName, genreString, releaseDate, overview);
    //const savedMovie = await Movie.create(movie); //Rappresenta l'oggetto del film appena salvato nel database
    console.log(movie);
    res.send(movie); //Restituisce l'oggetto saved movie al client che ha fatto la richiesta
    return movie;
  } catch (err) {
    genericCatchError(err, res); //In caso si crash restituisci l'errore
  }
};

export const getUserMoviesById = async (req, res) => {
  try {
    const userId = req.params.userId; // ottieni l'ID dell'utente dalla richiesta

    // Query per ottenere i film preferiti dell'utente specificato
    const movies = await Movie.findAll({
      where: { userId: userId },
      attributes: ['moviePoster', 'movieTitle', 'director', 'genre', 'time'], // campi desiderati
    });

    res.status(200).json(movies);
  } catch (err) {
    genericCatchError(err, res);
  }
};



/*
//Chiamata per recuperare i dati dal db per popolare la tabella reviews nella nostra app
export const getDataMoviesDb = async (req, res) => {
  try{
    const movies = await Movie.findAll({
      attributes: ['moviePoster', 'movieId', 'movieTitle', 'director', 'genre'] //campi desiderati
    });
    res.status(200).json(movies)
  } catch (err) {
    genericCatchError(err, res);
  }
}*/
 
//Chiamata per eliminare i dati dal db e dalla tabella reviews
export const deleteMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const numDeleted = await Movie.destroy({
      where : {movieId: movieId}
    });
    console.log(numDeleted)
    if(numDeleted >= 1){
      res.status(200).json({message: `Film con id ${movieId} eliminato con successo.`})
    } else {
      res.status(404).json({message: `Film con id ${movieId} non trovato.`})
    }
  } catch (err) {
    genericCatchError(err, res);
  }
}

async function getRandomMovieByPages() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie", {
    params: {
      api_key: "9d6119934885461d038a44a2187e5df6", 
      language: "it-IT", 
      with_original_language: "en|it", 
      "primary_release_date.lte": "2023", 
      include_image_language: "en",
      page: Math.floor(Math.random() * 500) + 1, // Richiedi una pagina casuale (fino a 500)
      sort_by: "popularity.desc" // Ordina per popolarità in modo casuale
    }
  });
  const resultsWithPoster = response.data.results.filter(movie => movie.poster_path !== null);
  const randomIndex = Math.floor(Math.random() * resultsWithPoster.length); // Genera un numero casuale fra 0 e il numero di film nella risposta filtrata
  const randomMovie = resultsWithPoster[randomIndex]; // Seleziona il film casuale dalla lista dei risultati e lo inserisce nella variabile
  return randomMovie;
}

//Funzione asincrona per recuperare il titolo del film
async function getMovieTitle(randomMovie) {
  const responseTitle = await axios.get
    (`https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=9d6119934885461d038a44a2187e5df6&language=it-IT`); //Query
  const movieTitle = responseTitle.data.title; //Ottieni il titolo del film dal JSON della risposta dell'API
  return movieTitle; //Restituisci il titolo del film
}

async function getMoviePoster(randomMovie) {
  const responsePoster = await axios.get
    (`https://api.themoviedb.org/3/movie/${randomMovie.id}/images?api_key=9d6119934885461d038a44a2187e5df6&language=en`); //Query
  const posterPath = responsePoster.data.posters[0].file_path; //Ottieni il percorso del file del poster dal JSON della risposta dell'API
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`; //Costruisci l'URL completo del poster
  return posterUrl; //Restituisci l'url del poster
}

//Funzione che tramite la query mi restituisce un array di attori e regista, poi trasformo in stringa per salvare nel mio DB
async function getAndTransformActorsAndDirectorInString(randomMovie) {
  const responseCredits = await axios.get
    (`https://api.themoviedb.org/3/movie/${randomMovie.id}/credits?api_key=9d6119934885461d038a44a2187e5df6`); //Query
  const cast = responseCredits.data.cast.slice(0, 5); //Recupero i primi cinque membri del cast del film dal risultato della richiesta API "responseCredits"
  //Utilizzo il metodo map() per creare un nuovo array contenente solo i nomi degli attori presenti nell'array "cast"
  //Converte quindi questo nuovo array in una stringa utilizzando il metodo join(), con una virgola e uno spazio come separatore tra i nomi degli attori
  //Assegna la stringa risultante alla costante 'actorsString'
  const actorsString = cast.map((actor) => actor.name).join(", ");
  //Mediante la funzione find() trovo il primo elemento di un array (in questo caso il regista) e lo restituisco
  const director = responseCredits.data.crew.find((crewMember) => crewMember.job === "Director");
  const directorName = director ? director.name : "sconosciuto"; //Se il nome del regista non è presente restituisci "sconosiuto"
  return { actorsString, directorName }; //Restituisci la stringa degli attori e il regista
}

//Funzione per recuperare genere, data di rilascio e trama
async function getMovieOtherDetails(randomMovie) {
  const response = await axios.get
    (`https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=9d6119934885461d038a44a2187e5df6&language=it-IT`); //Query
  const releaseDate = response.data.release_date; //Ottengo la data di rilascio
  const overview = response.data.overview; //Ottengo la data
  const genreString = response.data.genres.map(genre => genre.name).join(", "); //Ottengo il genere e trasformo l'array in stringa
  return { releaseDate, overview, genreString }; //Restituisci i valori raccolti
}

//Funzione che crea un nuovo oggetto movie, l'unica richiesta http è l'userId
function addNewMovie(req, randomMovie, movieTitle, moviePoster, actorsString, directorName, genreString, releaseDate, overview) {
  return {
    userId: req.body.userId, //Richiesta HTTP in input, indica l'Id dell'utente che sta salvando il film nel database
    movieId: randomMovie.id, //Id ricavato casualmente
    movieTitle: movieTitle, //Titolo del film
    moviePoster: moviePoster, //Url del poster
    actors: actorsString, //Stringa degli attori trasformata dall'array
    director: directorName, //Regista
    genre: genreString, //Stringa dei generi trasformata dall'array
    releaseDate: releaseDate, //Film rilasciati fino al 2020
    overview: overview, //Trama del film
  };
}

//Funzione asincrona per aggiornare il film con recensione e voto
// export const updateMovieByMovieId = async (req, res) => {
//   try {
//     const { movieId } = req.params; //Parametro da inserire nell'url della richiesta
//     const { comment, rating } = req.body; //Dati da inserire nell'oggetto della richiesta
//     const movie = await Movie.findOne({ where: { movieId } }); //Cerco un film nel database in base al parametro movieId
//     movieChecks(movie, res, movieId); //Avvisa se il film non è presente
//     //todo zaccare una delete potentissima nel caso in cui non si metta una recensione
//     await updateMovie(comment, rating, movieId); //Aggiorna il film col movieId passato come paramtro aggiungendo recensione e voto
//     movieUpdated(res, movieId); //Restituisci messaggio nel caso in cui ho aggiornato la recensione correttamente
//     res.send(movie); //Restituisce l'oggetto movie al client che ha fatto la richiesta
//   } catch (err) {
//     genericCatchError(err, res); //In caso si crash restituisci l'errore
//   }
// };

//POST che mi mermette di salvare il film ottenuto da getRandomMovie nel DB
/* export const saveMovieToDB = async (movie, res) => {
  try {
    console.log(movie);
    const savedMovie = await Movie.create(movie);
    console.log('Film salvato nei preferiti');
    res.status(201).send(savedMovie);
    console.log(movie.actor);
    return savedMovie;
  } catch (err) {
    console.error(err);
    throw new Error('Errore durante il salvataggio del film nei preferiti');
  }
} */

//Funzione asincrona per aggiornare il film con recensione e voto
export const saveMovieToDB = async (req, res) => {
  const { userId, movieId, movieTitle, moviePoster, actors, director, genre, releaseDate, overview, comment, rating, time } = req.body;

  try {
    // Crea un nuovo oggetto Movie con i campi forniti dal body della richiesta
    const newMovie = await Movie.create({
      userId,
      movieId,
      movieTitle,
      moviePoster,
      actors,
      director,
      genre,
      releaseDate,
      overview,
      comment,
      rating,
      time
    });

    res.status(200).send('Recensione salvata con successo');
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore durante il salvataggio della recensione');
  }
};

//Get per trovare il film aggiornato con la recensione 
export const getUpdatedMovie = async (req, res) => {
  try {
    const { movieId } = req.params; //Parametro da inserire nell'url della richiesta
    const movie = await Movie.findOne({ where: { movieId } }); //Cerco un film nel database in base al parametro movieId
    movieChecks(movie, res, movieId); //Avvisa se il film non è presente
  } catch (err) {
    genericCatchError(err, res); //In caso si crash restituisci l'errore
  }
};

//Messaggio che mi avvisa se il film è stato aggiornato correttamente con recensione e voto
function movieUpdated(res, movieId) {
  res.json({
    "message": `Film con id ${movieId} aggiornato correttamente` //Messaggio
  });
}

//Funzione asincrona che tramite il movieId passato come parametro aggiorna il film con commento e voto
async function updateMovie(comment, rating, movieId) {
  await Movie.update({ comment, rating }, { where: { movieId } } //Aggiorna recensione e voto col parametro movieId
  );
}

//Messaggio di risposta
function movieChecks(movie, res, movieId) {
  if (!movie) { //Se il film non è presente nel db
    res.status(404).json({
      "message": `Il film con id ${movieId} non esiste` //messaggio
    });
  }
}

//In caso di crash restituisci l'errore
function genericCatchError(err, res) {
  console.log(err); //Visualizza l'errore nella console
  res.status(500).json({ //Restituisci un errore 500 formattato in JSON
    "message": "Errore", //Messaggio d'errore nella risposta della richiesta
  });
}
