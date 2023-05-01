import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';



@Component({
  selector: 'tnv-polaroid-card',
  templateUrl: './polaroid-card.component.html',
  styleUrls: ['./polaroid-card.component.scss']
})
export class PolaroidCardComponent {
 
  constructor() { this.movie = {}; }

  @Input() movie: Partial<Movie>;


}
