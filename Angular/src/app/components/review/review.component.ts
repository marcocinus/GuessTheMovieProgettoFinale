import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PlayService } from 'src/app/@shared/services/play.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  recensione = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(160)]);
  showError = false;
  rate = 0;
  risultato: string= '';
  recensioneAggiunta = false;



  @Input() totalTime: number = 0;



  //passaggio dell'oggetto movie e iniezione del service per richiamre il metodo poste inviare i dati al BE
  constructor(private playService: PlayService) { this.movie = {}; }
  @Input() movie: Partial<Movie>;
  
  

//funzione che passa le proprietà dell'oggetto movie a un oggetto review in modo da salvarle
//tramite il service richiamiamo il suo metodo POST per inviare i dati al BE che salverà i dati nel DB
submitReview(){
  const userId = this.playService.getUserId();
  const review = {
  userId: userId,
  movieId: this.movie.movieId ?? '',
  movieTitle: this.movie.movieTitle ?? '',
  moviePoster: this.movie.moviePoster ?? '',
  actors: this.movie.actors ?? '',
  director: this.movie.director ?? '',
  genre: this.movie.genre ?? '',
  releaseDate: this.movie.releaseDate ?? '',
  overview: this.movie.overview ?? '',
  comment: this.recensione.value ?? '',
  rating: this.rate,
  time: this.totalTime,
  createdAt: this.movie.createdAt ?? '',
  updatedAt: this.movie.updatedAt ?? '',
};

if (this.recensione.invalid) {
  this.showError = true;
  return;
}

this.playService.saveMovieToDB(review).subscribe({next: (response) => this.movie = response});

  (error: any) => {
    console.error('Errore durante il salvataggio della recensione:', error);
    this.risultato = "Errore durante il salvataggio della recensione, riprova.";
    this.showError = true;
  }
this.recensioneAggiunta = true;
}

  getErrorMessage() {
    if (this.recensione.hasError('required')) {
      return 'Devi inserire una recensione';
    } else if (this.recensione.hasError('minlength')) {
      return 'La recensione deve contenere almeno 10 caratteri';
    } else if (this.recensione.hasError('maxlength')) {
      return 'La recensione deve contenere al massimo 160 caratteri';
    }
    return '';
  }

  submitForm() {
    if (this.recensione.invalid) {
      this.showError = true;
    } else {
      // Implementare la logica di invio recensione
    }
  }

  giocaAncora() {
    location.reload();
  }
}