import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  time: number = 60;
  score: number = 0;
  timerInterval: any;
  extraTimeInterval: any;
  infoMessage: string = '';
  gameOver: boolean = false;
  hasStarted: boolean = false;

  fadeout = false;
  buttonPosition = {};

  start() {
    this.time = 60;
    this.score = 0;
    this.gameOver = false;
    this.hasStarted = true;
    this.infoMessage = '';
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    this.moveButtonRandomly();
  }

  updateTimer() {
    if (this.time <= 0) {
      clearInterval(this.timerInterval);
      clearInterval(this.extraTimeInterval);
      this.gameOver = true;
      this.infoMessage = 'Game over';
    } else {
      this.time--;
    }
  }

  addTime() {
    const randomTime = Math.floor(Math.random() * 5) + 1;
    this.time += randomTime;
    this.score += randomTime;
    this.showExtraTime(randomTime);
    this.moveButtonRandomly();
  }

  moveButtonRandomly() {
    const randomX = Math.max(Math.floor(Math.random() * window.innerWidth - 100), 0);
    const randomY = Math.max(Math.floor(Math.random() * window.innerHeight - 30), 64);
    this.buttonPosition = { left: `${randomX}px`, top: `${randomY}px` }
  }

  showExtraTime(time: number) {
    clearInterval(this.extraTimeInterval);
    this.infoMessage = `+${time} seconds`;
    this.fadeout = false;
    this.extraTimeInterval = setTimeout(() => {
      this.fadeout = true;
    }, 750);
  }

  getFormattedTime(): string {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}


