# Progetto finale IX Edizione
## Guess The Movie

Realizzare un’applicazione web che recuperi casualmente un film attaverso un’API esterna e lo proponga all’utente nascondendo tutti i suoi campi tra cui la locandina (almeno 5, come ad esempio: titolo, genere, attori, anno di uscita, rating, lingua, …). 
I film senza locandina deve essere esclusi.

L’utente attraverso un pulsante “Inizia gioco” farà partire un countdown che partirà da un limite prefissato (ad es. 3 minuti) e potrà indicare in un campo di input dedicato il titolo del film. Con il passare del tempo i campi diventano parzialmente visibili (o uno alla volta, o tutti parzialmente - per lettera, per parola) ad eccezione del titolo.

Una volta indovinato l’utente potrà scegliere se salvarlo nella lista dei preferiti, e in tal caso dovrà dare un voto al film e inserire una breve recensione di massimo 160 caratteri. Per ogni film dovrà essere registrato il tempo impiegato per indovinare il film. Tale lista dovrà essere visibile nell’applicazione stessa e dovrà essere possibile eliminare i film.

## Cosa serve

Scaricare la release e crearsi due database, si consiglia di utilizzare MySql Workbench. 

`CREATE DATABASE movies;`
`CREATE DATABASE users;`

Dopo aver creato i database aprire la cartella dell'intero progetto su **Visual Studio Code** e seguire le prossime istruzioni:

## Frontend
**Angular**

Gestione di tutte le logiche lato client e elaborazione delle rotte HTML.

Aprire il terminale e assicurasi di essere nella cartella `GuessTheMovie/Angular` ed eseguire i comandi `npm install` `ng serve`


## Backend
***SpringBoot***

API per l'accesso dell'utente, la registrazione e il login.

Da IntelliJ aprire il progetto nella cartella `GuessTheMovie/SpringBoot` e far partire il programma dal main.
PS. Nel file `application.properties` troverete delle righe che indicano i dati del database, dovrete modificare la password presente con la vostra.

***Node.js***

API che gestisce la la lista dei film giocati e il tempo impiegato.

Aprire il terminale e assicurarsi di essere nella cartella `GuessTheMovie/Node` ed eseguire i comandi `npm install` e `nodemon server.js`.

***API esterna***

[TMDB](https://www.themoviedb.org/documentation/api): da questo sito abbiamo potuto prendere tutti i dati dei film necessari.

## Team

* Marco Cinus (Team Leader)
* Laura Argiolas
* Cristiano Aru
* Marco Foddi

