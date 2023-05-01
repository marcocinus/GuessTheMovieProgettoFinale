import { Component, Input, OnInit} from '@angular/core';
import { PlayService } from 'src/app/@shared/services/play.service';
import { Movie } from 'src/app/models/movie';


@Component({
  selector: 'tnv-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent  implements OnInit {


  // Input che accetta l'ID del film da caricare.
@Input() movieId: any;

// Proprietà utilizzata per memorizzare le informazioni sul film.
movie: Partial<Movie> = {};

constructor(private playService: PlayService) {}

ngOnInit() {
  // Richiesta al servizio PlayService un film casuale.
  this.playService.getRandomMovie().subscribe(
    (movie: Movie) => {
      // Quando la richiesta ha successo, memorizza le informazioni del film nella proprietà "movie".
      this.movie = movie;
    },
    (error) => {
      console.log(error);
    }
  );
}
  
}
