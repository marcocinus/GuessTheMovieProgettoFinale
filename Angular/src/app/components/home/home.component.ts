import { Component, Input} from '@angular/core';


@Component({
  selector: 'tnv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  
    elapsedTime = 0;
    cardElapsedTime = 0;

    gameStarts = false;

    mostraCard() {
      this.gameStarts = true;
    }
  
    addThirtySeconds(value: number) {
      this.cardElapsedTime += value;
    }
  }
