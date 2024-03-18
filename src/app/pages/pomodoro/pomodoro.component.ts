import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit {

  //Store timer data
  time: number;
  isPaused: boolean; //to check if timer  is paused

  constructor() {
    this.time = 1500; // Initial time in seconds (25 minutes)
    this.isPaused = true; //timer is initially paused as its = true
  }

  ngOnInit() {
    this.updateTimer(); //Timer starts updating upon component initializations
  }

  //Method to update the timer ever second
  private updateTimer() {
    //check if timer is greater than 0 and the timer is not paused
    if (this.time > 0 && !this.isPaused) {
      setTimeout(() => { //The setTimeout() method calls a function after a number of milliseconds. 1 second = 1000 milliseconds. <---You can find this on W3schools
        this.time--; //time is decreased by 1 second
        this.updateTimer();
      }, 1000);
    }
  }

  //Method to format the current time as a string in mintues : second (00:00)
  formatTime(): string {
    //Calculate minutes and seconds and convert to Strings
    const minutes: string = Math.floor(this.time / 60).toString(); //Math provides basic maths functionailty
    const seconds: string = (this.time % 60).toString();
    return `${minutes}:${seconds}`; //return time as minutes and seconds
  }

  //method to start and pause timer
  startPauseTimer() {
    this.isPaused = !this.isPaused; //toggle isPaused
    if (!this.isPaused) { //If the timer is not paused then continue updating the timer
      this.updateTimer();
    }
  }

  //Method to reset the timer to the initial value
  resetTimer() {
    this.time = 1500; // Reset time to initial value
    this.isPaused = true; //Pause the timer
  }
}