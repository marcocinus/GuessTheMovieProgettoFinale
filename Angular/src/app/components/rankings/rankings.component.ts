import { Component, EventEmitter, Output} from '@angular/core';
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
  this.playService.getUserMovie(userId).subscribe({
    next: (response) => this.favoriteMovies = response
  });
}

deleteMovie(movieId: string) {
  this.playService.deleteUserMovie(movieId);
      // Rimuove il film dalla lista favoriteMovies in base al movieId passato
      this.favoriteMovies = this.favoriteMovies.filter(x => x.movieId !== movieId);
    }
}