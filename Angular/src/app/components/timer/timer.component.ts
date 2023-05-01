import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit{
  
  totalElapsedTime: number = 0;
  
  ngOnInit(): void {
  }

  @Input() elapsedTime: number = 0;
  @Input() cardElapsedTime: number = 0;
  @Input() isRunning: boolean = false;
  @Input() isStopped: boolean = false;
  @Input() gameCompleted: boolean = false;

  @Output() totalTimeEvent = new EventEmitter<number>();
  @Output() elapsedTimeEvent = new EventEmitter<number>();
  @Output() stopTimerEvent = new EventEmitter<boolean>();

  intervalId: any;

  constructor() { this.movie = {}; }

  @Input() movie: Partial<Movie>;

  startTimer() {
    this.isRunning = true;
    this.isStopped = false;
    this.totalElapsedTime = this.elapsedTime + this.cardElapsedTime;
    this.intervalId = setInterval(() => {
      this.elapsedTime += 1000;
      this.totalElapsedTime = this.elapsedTime + this.cardElapsedTime;
    }, 1000);
  }

  stopTimer() {
    this.isRunning = false;
    this.isStopped = true;
    clearInterval(this.intervalId);
    this.elapsedTimeEvent.emit(this.elapsedTime);
    
    // Aggiungi una variabile per salvare il tempo trascorso
    const totalTime = this.elapsedTime + this.cardElapsedTime;
    this.totalTimeEvent.emit(totalTime);
    console.log(totalTime);
  }

  onTimerStopped(event: boolean) {
    if (event) {
      this.stopTimerEvent.emit(true); // emette il nuovo evento
      this.stopTimer(); //ferma il timer
    }
  }

  giocaAncora() {
    location.reload();
  }
}



