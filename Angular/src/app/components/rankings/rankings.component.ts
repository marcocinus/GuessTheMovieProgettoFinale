import { Component} from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { PlayService } from 'src/app/@shared/services/play.service';


@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent { 
  // Proprietà utilizzata per memorizzare una lista di film preferiti.
favoriteMovies: Movie[] = []; 

constructor(private playService: PlayService) { } 

ngOnInit() {
  // Recupera l'ID dell'utente dal servizio PlayService.
  const userId = this.playService.getUserId(); 

  // Richiede al servizio PlayService una lista di film preferiti dell'utente.
  this.playService.getUserMovie(userId).subscribe( 
    (movies: Movie[]) => { 
      // Quando la richiesta ha successo, memorizza la lista di film preferiti nella proprietà "favoriteMovies".
      this.favoriteMovies = movies; 
    }, 
    (error) => { 
      console.error('Errore durante il recupero dei film preferiti:', error); 
    } 
  ); 
} 

// Funzione utilizzata per eliminare un film dalla lista dei film preferiti.
deleteMovie(movie: Movie) { 
  // Richiede al servizio PlayService di eliminare il film dall'elenco dei film preferiti dell'utente.
  this.playService.deleteUserMovie(movie.movieId).subscribe( 
    () => { 
      // Rimuove il film selezionato dall'array dei film preferiti.
      const index = this.favoriteMovies.indexOf(movie); 

      if (index !== -1) { 
        this.favoriteMovies.splice(index, 1); 
      } 
    }, 
    error => { 
      console.error('Errore durante l\'eliminazione del film:', error); 
    } 
  ); 
}
}