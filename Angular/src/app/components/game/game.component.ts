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
  constructor() {
    // Inizializza la proprietà "movie" a un oggetto vuoto.
    this.movie = {};
  }
  
  // Input che accetta un oggetto "Movie"
  @Input() movie: Partial<Movie>;
  
  // Proprietà utilizzate per tenere traccia del tempo trascorso.
  elapsedTime = 0;
  cardElapsedTime = 0;
  totalTime = 0;
  
  // componenti utilizzati per accedere ai componenti figli.
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  @ViewChild(AddReviewComponent) addReviewComponent!: AddReviewComponent;
  
  // Proprietà booleane utilizzate per gestire lo stato del gioco.
  gameStarts = false;
  timerStopped = false;
  showInsertTitle = false;
  correctTitle = false;
  gameCompleted: boolean = false;
  
  // Funzione che viene chiamata quando l'utente fa clic su un pulsante per iniziare il gioco.
  showCards() {
    // Imposta lo stato del gioco su "iniziato" e mostra la schermata di inserimento del titolo.
    this.gameStarts = true;
    this.showInsertTitle = true;
  }
  
  // Funzione che viene chiamata quando l'utente fa clic su un pulsante per aggiungere 30 secondi al timer.
  addThirtySeconds(value: number) {
    // Aggiorna la proprietà "totalTime" con il tempo trascorso.
    this.totalTime = this.cardElapsedTime += value;
  }
  
  // Funzione che viene chiamata quando l'utente fa clic su un pulsante per arrendersi durante il gioco.
  giveup() {
    // Ferma il timer e nasconde la schermata di inserimento del titolo.
    this.timerStopped = true;
    this.showInsertTitle = false;
  }
  
  // Funzione che viene chiamata dal componente "TimerComponent" ogni secondo per aggiornare il tempo trascorso.
  handleElapsedTime(elapsedTime: number) {
    // Aggiorna la proprietà "elapsedTime".
    this.elapsedTime = elapsedTime;
  }
  
  // Funzione che viene chiamata quando l'utente ha indovinato il titolo del film.
  onTitoloCorretto(titoloCorretto: boolean) {
    // Imposta lo stato del gioco su "completato" e ferma il timer.
    this.correctTitle = titoloCorretto;
    if (this.correctTitle) {
      this.gameCompleted = true;
      this.timerComponent.stopTimer(); // Ferma il timer.
    }
  }
  
  // Funzione che viene chiamata dal componente "TimerComponent" quando il tempo limite del gioco è stato raggiunto.
  onTotalTime(totalTime: number) {
    // Aggiorna la proprietà "totalTime".
    this.totalTime = totalTime;
  }
  
  // Funzione che viene chiamata quando l'utente interrompe il gioco.
  stopTimer() {
    // Ferma il timer, ripristina lo stato del gioco e pulisce la proprietà "elapsedTime".
    this.gameStarts = false;
    this.timerStopped = true;
    clearInterval(this.elapsedTime);
  }
  
  // Funzione che viene chiamata dal componente "TimerComponent" quando il timer è stato interrotto.
  onTimerStopped(timerStopped: boolean) {
    // Aggiorna lo stato del timer.
    this.timerStopped = timerStopped;
  }
}