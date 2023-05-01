import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';



@Injectable({
  providedIn: 'any'
})
export class PlayService {
  
  private authService: AuthService;

 //istanza HttpClient e AuthService per salvare l'id dell'utente
 constructor(private httpClient: HttpClient, authService: AuthService) {
  this.authService = authService;
 }

  API_ROOT = 'http://localhost:1234/api';

  //chaimata get che recupera dal be i dati di un film 
  getRandomMovie() {
    return this.httpClient.get<Movie>(`${this.API_ROOT}/randomMovie`);
  }

  //metodo che consente di recuperare e salvare userId dell'utente loggato
  public getUserId(): string {
    const currentUser: User = this.authService.getCurrentUser();
    const userId = currentUser?.id;
    return userId;
  }

  //chiamata post che invia i dati recuperati dalla GET al BE per salvarli nel databse 
  //aggiungendo userId, voto e recensione inseriti dall'utente 
  saveMovieToDB(movie: Movie): Observable<Movie> {
    const userId = this.getUserId();
    return this.httpClient.post<Movie>(`${this.API_ROOT}/saveMovie`, movie);
  }

  getUserMovie(userId: string): Observable<Movie[]> {
    const url = (`${this.API_ROOT}/${userId}/movies`); // includi l'userId nell'URL della richiesta
      return this.httpClient.get<Movie[]>(url);
  }

  deleteUserMovie(movieId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_ROOT}/movies/${movieId}`);
  }

}