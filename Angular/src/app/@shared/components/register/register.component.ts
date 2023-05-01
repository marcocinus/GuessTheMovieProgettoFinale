import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import { RegisterDTO } from "src/app/models/user";


@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  showPassword = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

  register(form: NgForm) {
    //iterazione con tutti i campi del modulo
    form.control.markAllAsTouched();
    if (form.valid) {
      //crea un ogetto registerData
      const registerData: RegisterDTO = {
        name: form.value.name,
        surname: form.value.surname,
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
      };
      //passa l'oggetto registerData come argomento al servizio di autenticazione
      this.authService.register(registerData).subscribe(
        () => {
          // Se la registrazione è riuscita, reindirizza l'utente alla pagina di login
          this.router.navigateByUrl("/");
        },
        (error: any) => {
          //se la chiamata restituisce errore status:400 l'username utilizzato è gia presente nel DB
          if (error.status === 400 && error.error.message === "Utente già esistente") {
            alert("Username già esistente");
          } else {
            console.error("Errore durante la registrazione", error);
            //messaggio alert che appare nell'interfaccia utente
            alert("Errore durante la registrazione. Username già esistente");
          }
        }
      );
    }
  }
}
