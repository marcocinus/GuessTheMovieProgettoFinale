import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayService } from 'src/app/@shared/services/play.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-insert-title',
  templateUrl: './insert-title.component.html',
  styleUrls: ['./insert-title.component.scss']
})
export class InsertTitleComponent {
  constructor() { this.movie = {}; }

  @Input() movie: Partial<Movie>;

  @Output() titoloCorretto = new EventEmitter<boolean>();
  @Output() stopTimerEvent = new EventEmitter<boolean>();

  titoloInserito: string = '';
  risultato: string= '';


  //metodo che verifica se l'utente indovina il titolo
  confermaTitolo() {
    if (this.titoloInserito && this.movie.movieTitle && this.titoloInserito.toLocaleLowerCase() === this.movie.movieTitle.toLocaleLowerCase()) {
      this.titoloCorretto.emit(true);
      this.stopTimerEvent.emit(true);
    } else {
      this.risultato = "Spiacente, il titolo che hai inserito non è corretto.";   
    }

  }
  
}
