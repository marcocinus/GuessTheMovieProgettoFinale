import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayService } from 'src/app/@shared/services/play.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-insert-title',
  templateUrl: './insert-title.component.html',
  styleUrls: ['./insert-title.component.scss']
})
export class InsertTitleComponent {
  constructor() {
    // Inizializza la proprietà "movie" a un oggetto vuoto.
    this.movie = {};
  }
  
  // Input che accetta un oggetto "Movie" 
  @Input() movie: Partial<Movie>;
  
  // Output che emette un evento booleano quando l'utente ha indovinato il titolo del film.
  @Output() titoloCorretto = new EventEmitter<boolean>();
  
  // Output che emette un evento booleano quando l'utente interrompe il timer.
  @Output() stopTimerEvent = new EventEmitter<boolean>();
  
  // Proprietà utilizzata per memorizzare il titolo inserito dall'utente.
  titoloInserito: string = '';
  
  // Proprietà utilizzata per memorizzare il messaggio di errore o di successo.
  risultato: string= '';
  
  // Metodo che verifica se l'utente ha indovinato il titolo del film.
  confermaTitolo() {
    // Controlla se l'utente ha inserito un titolo e se il titolo del film è stato passato come input.
    if (this.titoloInserito && this.movie.movieTitle && this.titoloInserito.toLocaleLowerCase() === this.movie.movieTitle.toLocaleLowerCase()) {
      // Se il titolo è corretto, emette un evento booleano attraverso l'output "titoloCorretto".
      this.titoloCorretto.emit(true);
      // Emette un evento booleano attraverso l'output "stopTimerEvent" per interrompere il timer.
      this.stopTimerEvent.emit(true);
    } else {
      // Se il titolo inserito dall'utente non corrisponde al titolo del film, visualizza un messaggio di errore.
      this.risultato = "Spiacente, il titolo che hai inserito non è corretto.";   
    }
  }
  
}
