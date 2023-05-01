import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  showPassword = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

  login(form: NgForm) {
    console.log("login component.ts", form.value);
    form.control.markAllAsTouched();

    //il form viene considerato valido se tutti i campi sono stati compilati 
    if (form.valid) {

      //viene chiamata la funzione login del servizio di autenticazione 
      //passando come parametro i dati inseriti dall'utente
      this.authService.login(form.value).subscribe({

        //next gestisce la risposta del BE che salva i dati trasfomrati in json nell'archiviazione locale
        next: (response) => {
          localStorage.setItem("user", JSON.stringify(response));

          //per il momento (manda l'utente al profilo dove vengono visualizzati i suoi dati)
          this.router.navigateByUrl("/");
        },

        //se la risposta del BE è password errata visualizza un alert all'utente che dovrà inserire nuovamente la password
        error: (err) => {
          if (err.status === 500 && err.error === "Password Errata") {
            alert("Username o password errata");
          } else {
            alert("Username o password errata");
          }
        },
      });
    }
  }
}