import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';


@Component({
  selector: 'tnv-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})

export class AddReviewComponent {

  constructor() { this.movie = {}; }

  //importo le proprieta
  @Input() movie: Partial<Movie>;
  @Input() elapsedTime: number = 0;
  @Input() totalTime: number = 0;

  reviewVisibile = false;

  //funzione che rende visibile la parte per inserire la recensione all'utente
  mostraReview() {
    this.reviewVisibile = true;
  }

  //ricarica la pagina di gioco
  giocaAncora() {
    location.reload();
  }
  
}
