import { Component, Input, Output, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { TimerComponent } from '../timer/timer.component';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'tnv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  constructor() { this.movie = {}; }

  @Input() movie: Partial<Movie>;

  elapsedTime = 0;
  cardElapsedTime = 0;
  totalTime = 0;

  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  @ViewChild(AddReviewComponent) addReviewComponent!: AddReviewComponent;

  gameStarts = false;
  timerStopped = false;
  showInsertTitle = false;
  correctTitle = false;
  gameCompleted: boolean = false;

  showCards() {
    this.gameStarts = true;
    this.showInsertTitle = true;
  }

  addThirtySeconds(value: number) {
    this.totalTime = this.cardElapsedTime += value;
  }

  giveup() {
    this.timerStopped = true;
    this.showInsertTitle = false;
  }

  handleElapsedTime(elapsedTime: number) {
    this.elapsedTime = elapsedTime;
  }


  onTitoloCorretto(titoloCorretto: boolean) {
    this.correctTitle = titoloCorretto;
    if (this.correctTitle) {
      this.gameCompleted = true;
      this.timerComponent.stopTimer();
      console.log(this.totalTime);
    }
  }

  onTotalTime(totalTime: number) { //aggiungi il metodo onTotalTime per ricevere il valore di totalTime emesso dal componente TimerComponent
    this.totalTime = totalTime;
  }

  stopTimer() {
    this.gameStarts = false;
    this.timerStopped = true;
    clearInterval(this.elapsedTime);
  }

  onTimerStopped(timerStopped: boolean) {
    this.timerStopped = timerStopped;
  }
}