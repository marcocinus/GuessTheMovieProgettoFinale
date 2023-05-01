import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayService } from 'src/app/@shared/services/play.service';
import { MatCard } from '@angular/material/card';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent {
  showDirector = true;
  showGenre = true;
  showData = true;
  showActors = true;
  showOverview = true;

  isClicked = false;

  constructor() { this.movie = {}; }

  @Input() movie: Partial<Movie>;

  @Output() addThirtySeconds = new EventEmitter<number>();

  onClick() {
    this.addThirtySeconds.emit(30000);
    this.isClicked=true;
    }
  }