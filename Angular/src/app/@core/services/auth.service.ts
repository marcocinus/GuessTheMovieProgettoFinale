import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, map, throwError } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) {}
   
  //metodo login restituisce un Observable di tipo User
    login(loginData: LoginDTO): Observable<User> {

      //chiamata POST al BE SpringBoot che invia i dati di acesso dell'utente
      return this.http.post<User>(`${this.springBootUrl}/login`, loginData)

      //pipe viene utilizzata per concatenare la funzione map che trasforma i dati 
      //restituiti dalla chiamata httppost in un oggetto user
      .pipe(map(user => {

        //i dati vengono trasformati in una stringa json per poter essere salvati nell'archiviazione locale del browser
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        })
      );
    }
  
    register(registerData: RegisterDTO): Observable<any> {
      // Verifica se l'username inserito dall'utente è già presente nel database
      return this.http.get(`${this.springBootUrl}/users/${registerData.username}`).pipe(
        map((_response) => {
          // Se l'username esiste già, restituisci un errore con il messaggio "Username già esistente"
          return throwError("Username già esistente");
        }),
        catchError((_error) => {
          // Se non esiste, invia una richiesta POST al backend per registrare il nuovo utente
          return this.http.post(`${this.springBootUrl}/users`, registerData);
        })
      );
    }

    
  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

}
