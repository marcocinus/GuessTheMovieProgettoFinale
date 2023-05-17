import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';



@Injectable({
  providedIn: 'any'
})
export class PlayService {

  movie: Movie [] = [];
  
  private authService: AuthService;

  // Istanza HttpClient e AuthService per salvare l'ID dell'utente.
  constructor(private httpClient: HttpClient, authService: AuthService) {
    this.authService = authService;
  }

  API_ROOT = 'http://localhost:1234/api';

  // Chiamata GET che recupera dal backend i dati di un film.
  getRandomMovie() {
    return this.httpClient.get<Movie>(`${this.API_ROOT}/randomMovie`);
  }

  // Metodo che consente di recuperare e salvare l'ID dell'utente loggato.
  public getUserId(): string {
    const currentUser: User = this.authService.getCurrentUser();
    const userId = currentUser?.id;
    return userId;
  }

  // Chiamata POST che invia i dati recuperati dalla GET al backend per salvarli nel database
  // aggiungendo l'ID dell'utente, il voto e la recensione inseriti dall'utente.
  saveMovieToDB(movie: Movie): Observable<Movie> {
    const userId = this.getUserId();
    return this.httpClient.post<Movie>(`${this.API_ROOT}/saveMovie`, movie);
  }

  // Chiamata GET che recupera i film dell'utente dal backend.
  getUserMovie(userId: string){
    // includi l'ID dell'utente nell'URL della richiesta
    return this.httpClient.get<Movie[]>(`${this.API_ROOT}/${userId}/movies`)
    }

  // Chiamata DELETE che elimina un film dal database dell'utente.
  deleteUserMovie(movieId: string) {
   this.httpClient.delete(`${this.API_ROOT}/movies/${movieId}`).subscribe({
    next: () => this.movie = this.movie.filter( x => x.movieId !== movieId)
   });
  }
}
