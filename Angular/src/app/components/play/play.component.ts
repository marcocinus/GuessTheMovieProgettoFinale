import { Component, Input, OnInit} from '@angular/core';
import { PlayService } from 'src/app/@shared/services/play.service';
import { Movie } from 'src/app/models/movie';


@Component({
  selector: 'tnv-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent  implements OnInit {


  @Input() movieId: any;
  movie: Partial<Movie> = {};

  constructor(private playService: PlayService) {}

  ngOnInit() {
    this.playService.getRandomMovie().subscribe(
      (movie: Movie) => {
        this.movie = movie;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
