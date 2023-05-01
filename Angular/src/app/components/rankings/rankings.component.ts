import { Component} from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { PlayService } from 'src/app/@shared/services/play.service';


@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent { 
  favoriteMovies: Movie[] = []; 
 
  constructor(private playService: PlayService) { } 
 
  ngOnInit() { 
    const userId = this.playService.getUserId(); 
 
    this.playService.getUserMovie(userId).subscribe( 
      (movies: Movie[]) => { 
        this.favoriteMovies = movies; 
      }, 
      (error) => { 
        console.error('Errore durante il recupero dei film preferiti:', error); 
      } 
    ); 
  } 
 
  deleteMovie(movie: Movie) { 
    this.playService.deleteUserMovie(movie.movieId).subscribe( 
      () => { 
        // Rimuovi il film selezionato dall'array dei film preferiti 
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