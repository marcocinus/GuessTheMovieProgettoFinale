import Movie from "../models/movie.js"; //Importo il modello game
import axios from "axios"; //Importo il pacchetto axios per semplificare le richieste http e ordinarle meglio
 
const API_KEY = "9d6119934885461d038a44a2187e5df6"; //Costante Api key
 
//Funzione asincrona per recuperare un film random da un array con i dati utili per iniziare il gioco
export const getRandomMovie = async (req, res) => {
  try {
    let randomMovie = await getMovieWithRequiredData();
    const movieTitle = await getMovieTitle(randomMovie); //Utile per recuperare il titolo del film dal JSON della risposta dell'API
    const moviePoster = await getMoviePoster(randomMovie); //Recupera il poster
    const { actorsString, directorName } = await getAndTransformActorsAndDirectorInString(randomMovie);//Recupero i dati del cast per attori e regista e li trasformo da array in stringa
    const { genreString, releaseDate, overview } = await getMovieOtherDetails(randomMovie); //Recupero il genere, la data di rilascio e la trama
    //Creo un nuovo oggetto movie con i dati raccolti precedentemente
    const movie = addNewMovie(req, randomMovie, movieTitle, moviePoster, actorsString, directorName, genreString, releaseDate, overview);
    console.log(movie); //Visualizza il film nella console
    res.send(movie); //Restituisce l'oggetto saved movie al client che ha fatto la richiesta
  } catch (err) {
    genericCatchError(err, res); //In caso si crash restituisci l'errore
  }
};
 
//Funzione asincrona che utilizza un ciclo while per ottenere un film casuale che abbia la copertina valida
async function getMovieWithRequiredData() {
  let randomMovie; //Inizializzata come let perché deve essere riassegnata con un nuovo valore fino a quando non viene trovato un film casuale con un poster
  while (!randomMovie || !randomMovie.poster_path) { //Controllo se randomMovie esiste o se ha una proprietà poster_path nella risposta
    randomMovie = await getRandomMovieByPages(); //Chiama la funzione fino a quanto non non restituisce un film con il poster
  }
  return randomMovie; //Restituisce un film casuale con il poster
}
 
//Funzione asincrona che mediante una query mi restituisce un'oggetto movie con i parametri richiesti e filtra i risultati senza trama
//L'oggetto movie è generato casualmente mediante un randomIndex
async function getRandomMovieByPages() {
  const response = await axios.get //Effettuo la richiesta
  ("https://api.themoviedb.org/3/discover/movie", {
    params: {
      api_key: API_KEY, //Inserisco l'api key
      language: "it-IT", //Risultati solo in italiano
      with_original_language: "en|it", //In lingua originale in inglese e in italiano
      "primary_release_date.lte": "2023", //Fino al 2023
      include_image_language: "en", //Includi immagini in inglese
      page: Math.floor(Math.random() * 500) + 1, //Funzione che genera un numero randomico
      sort_by: "popularity.desc", //Il film più popolare saranno i primi ad essere visualizzati
      "vote_count.gte": 1000, //Visualizza i film con almeno 1000 voti
      "vote_average.gte": 6 //Film con voto pari a 6
    }
  });
  //Filtra la lista dei film in modo da includere solo quelli che hanno la proprietà overview definita e con una lunghezza maggiore di zero
  const resultsWithOverview = response.data.results.filter(movie => movie.overview && movie.overview.length > 0);
  const randomIndex = Math.floor(Math.random() * resultsWithOverview.length); //Genera un indice casuale tra zero e la lunghezza della lista 
  return resultsWithOverview[randomIndex]; //Restituisce il film corrispondente all'indice generato casualmente
}
 
//Funzione asincrona per recuperare il titolo del film
async function getMovieTitle(randomMovie) {
  const responseTitle = await axios.get //Effettuo la richiesta
  (`https://api.themoviedb.org/3/movie/${randomMovie.id}`, {
    params: {
      api_key: API_KEY, //Api key
      language: "it-IT" //Risultati in italiano
    }
  });
  return responseTitle.data.title; //Restituisci il titolo del film
}
 
//Funzione asincrona che prende in ingresso il film generato casualmente ed effettua una richiesta mediante il suo id per recuperare l'immagine
async function getMoviePoster(randomMovie) {
  const responsePoster = await axios.get //Effettuo la richiesta
  (`https://api.themoviedb.org/3/movie/${randomMovie.id}/images`, {
    params: {
      api_key: API_KEY, //Api key
      language: "en" //Risultati dei poster in inglese
    }
  });
  const posters = responsePoster.data.posters; //Ottengo l'array di poster dai risultati della richiest
  if (posters.length > 0) { //Controllo se ci sono poster
    const posterPath = posters[0].file_path; //Prendo il percorso del primo poster dall'array
    return `https://image.tmdb.org/t/p/w500${posterPath}`; //Restituisco l'url completo 
  } else { //Se non ci sono poster
    return ""; //Restituisco una stringa vuota
  }
}
 
//Funzione che tramite la query mi restituisce un array di attori e regista, poi trasformo in stringa per salvare nel mio DB
async function getAndTransformActorsAndDirectorInString(randomMovie) {
  const responseCredits = await axios.get //Effettuo la richiesta
  (`https://api.themoviedb.org/3/movie/${randomMovie.id}/credits`, {
    params: {
      api_key: API_KEY //Inserisco l'API key
    }
  });
  const cast = responseCredits.data.cast.slice(0, 5); //Seleziono i primi 5 attori del cast
  const actorsString = cast.map(actor => actor.name).join(", "); //Trasformo l'array di attori in una stringa separata da virgole
  const director = responseCredits.data.crew.find(crewMember => crewMember.job === "Director"); //Seleziono il regista del film
  let directorName = directorNameCheck(director); //Verifica che sia presente il nome del regista
  return { actorsString, directorName }; //Restituisci la stringa degli attori e il nome del regista
}
 
// Funzione che controlla la presenza del nome del regista e restituisce il nome del regista o "Regista Sconosciuto" se non presente
function directorNameCheck(director) {
  let directorName;
  if (director && director.name) { //Controllo che l'oggetto director esista e che abbia una proprietà name
    directorName = director.name; //Se esiste restituisco il nome del regista
  } else {
    directorName = "Regista Sconosciuto"; //Altrimenti restituisco "Regista Sconosciuto"
  }
  return directorName; //Restituisco nome del regista
}
 
//Funzione per recuperare genere, data di rilascio e trama
async function getMovieOtherDetails(randomMovie) {
  const response = await axios.get //Effettuo la richiesta
  (`https://api.themoviedb.org/3/movie/${randomMovie.id}`, {
    params: {
      api_key: API_KEY, //Api Key
      language: "it-IT" //Lingua italiana per la descrizione del film
    }
  });
  const { release_date: releaseDate, overview, genres } = response.data; //Estraggo i dettagli del film dalla risposta
  const genreString = genres.map(genre => genre.name).join(", ");  //Trasformo l'array di oggetti generi in una stringa separata da virgole
  return { releaseDate, overview, genreString }; //Restituisco un oggetto contenente i dettagli del film
}
 
//Funzione che crea un nuovo oggetto movie, l'unica richiesta http è l'userId
function addNewMovie(req, randomMovie, movieTitle, moviePoster, actorsString, directorName, genreString, releaseDate, overview, tagline) {
  return {
    userId: req.body.userId, //Richiesta HTTP in input, indica l'Id dell'utente che sta salvando il film nel database
    movieId: randomMovie.id, //Id ricavato casualmente
    movieTitle: movieTitle, //Titolo del film
    moviePoster: moviePoster, //Url del poster
    actors: actorsString, //Stringa degli attori trasformata dall'array
    director: directorName, //Regista
    genre: genreString, //Stringa dei generi trasformata dall'array
    releaseDate: releaseDate, //Film rilasciati fino al 2020
    overview: overview //Trama del film
  };
}
 
//Funzione per salvare il film nel database se i commenti sono inseriti correttamente
//Prende il body della richiesta che dovrebbe contenere le informazioni del film da salvare
//Viene fatto un controllo per assicurarsi che il salvataggio avvenga correttamente e viene restituito un messaggio di successo 
//in caso contrario viene restituito un errore generico
export const saveMovieToDB = async (req, res) => {
  const { userId, movieId, movieTitle, moviePoster, actors, director, genre, releaseDate, overview, comment, rating, time } = req.body; //Body della richiesta
 
  if (comment.length < 10 || comment.length > 160) { //Il commento deve essere compreso fra 10 e 160 caratteri
    res.status(410).json({
      "message": "Il commento deve essere compreso tra 10 e 160 caratteri", //Restituisci errore
    });
  } else {
    try {
      await Movie.create({ // Crea un nuovo oggetto Movie con i campi forniti dal body della richiesta, li inserisco tutti per eventuali aggiornamenti
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
      res.status(201).json({ //Restituisci un errore 201 formattato in JSON
        "message": "Film salvato nel DB correttamente", //Messaggio
      });
    } catch (err) {
      genericCatchError(err, res) //Errore generico catch
    }
  }
};
 
//Funzione asincrona che riceve una richiesta HTTP e restituisce la lista di tutti i film preferiti di un utente specificato
export const getUserMoviesById = async (req, res) => {
  const { userId } = req.params; //Recupero il movieId mediante il parametro della richiesta
 
  try {
    // Query per ottenere i film preferiti dell'utente specificato
    const movies = await Movie.findAll({ //Utilizzo la funzione findAll
      where: { userId }, //dove il record nel campo movieId della tabella ha lo stesso valore di quello passato come parametro della funzione
    });
    res.status(200).json(movies); //Restituisci un errore 201 formattato in JSON
  } catch (err) {
    genericCatchError(err, res); //Errore generico catch
  }
};
 
//Chiamata per eliminare i dati dal db e dalla tabella reviews
export const deleteMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId; //Recupero il movieId mediante il parametro della richiesta
    const numDeleted = await Movie.destroy({ //Cerca e elimina il film dal database
      where : { movieId: movieId } // dove il record nel campo movieId della tabella ha lo stesso valore di quello passato come parametro della funzione
    });
    if(numDeleted >= 1){ //Se ha eliminato il film
      res.status(200).json({ //Restituisci un errore 200 formattato in JSON
        "message": `Film con id ${movieId} eliminato con successo.` //Messaggio
      })
    } else { //Altrimenti
      res.status(401).json({ //Restituisci un errore 404 formattato in JSON
        "message": `Film con id ${movieId} non trovato.` //Messaggio
      })
    }
  } catch (err) {
    genericCatchError(err, res); //Errore generico catch
  }
}
 
//In caso di crash restituisci l'errore
function genericCatchError(err, res) {
  console.log(err); //Visualizza l'errore nella console
  res.status(400).json({ //Restituisci un errore 500 formattato in JSON
    "message": "Errore", //Messaggio d'errore nella risposta della richiesta
  });
}