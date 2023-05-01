import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit{
  
  // Proprietà utilizzata per memorizzare il tempo totale trascorso.
totalElapsedTime: number = 0;

constructor() { this.movie = {}; }

// Input che accetta un oggetto "Movie"
@Input() movie: Partial<Movie>;

// Input utilizzati per gestire il timer.
@Input() elapsedTime: number = 0;
@Input() cardElapsedTime: number = 0;
@Input() isRunning: boolean = false;
@Input() isStopped: boolean = false;
@Input() gameCompleted: boolean = false;

// Output che emette il tempo totale trascorso.
@Output() totalTimeEvent = new EventEmitter<number>();

// Output che emette il tempo trascorso dall'inizio del gioco.
@Output() elapsedTimeEvent = new EventEmitter<number>();

// Output che emette un evento booleano quando il timer viene interrotto.
@Output() stopTimerEvent = new EventEmitter<boolean>();


intervalId: any;

ngOnInit(): void {
}

startTimer() {
  // Imposta le proprietà "isRunning" e "isStopped".
  this.isRunning = true;
  this.isStopped = false;
  // Calcola il tempo totale trascorso.
  this.totalElapsedTime = this.elapsedTime + this.cardElapsedTime;
  // Avvia il timer.
  this.intervalId = setInterval(() => {
    // Incrementa l'elapsedTime di 1 secondo.
    this.elapsedTime += 1000;
    // Calcola il tempo totale trascorso.
    this.totalElapsedTime = this.elapsedTime + this.cardElapsedTime;
  }, 1000);
}

stopTimer() {
  // Imposta le proprietà "isRunning" e "isStopped".
  this.isRunning = false;
  this.isStopped = true;
  // Interrompe il timer.
  clearInterval(this.intervalId);
  // Emette l'evento "elapsedTimeEvent" con il tempo trascorso dall'inizio del gioco.
  this.elapsedTimeEvent.emit(this.elapsedTime);
  // Calcola il tempo totale trascorso.
  const totalTime = this.elapsedTime + this.cardElapsedTime;
  // Emette l'evento "totalTimeEvent" con il tempo totale trascorso.
  this.totalTimeEvent.emit(totalTime);
  console.log(totalTime);
}

onTimerStopped(event: boolean) {
  if (event) {
    // Emette l'evento "stopTimerEvent".
    this.stopTimerEvent.emit(true);
    // Interrompe il timer.
    this.stopTimer();
  }
}

giocaAncora() {
  // Ricarica la pagina per giocare di nuovo.
  location.reload();
}
}



