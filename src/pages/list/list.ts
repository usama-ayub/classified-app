import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Login } from '../login/login';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  currentTimer: number;
  isActive: boolean = true;
  timer: any;
  minutes: any = 0;
  seconds: any = 0;
  public setTime: any;
  pormodo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  pormodos() {
    this.setTime = 2;
    this.currentTimer = this.setTime * 60
    this.start()
  }
  short() {
    this.setTime = 1;
    this.currentTimer = this.setTime * 60
    this.start()
  }
  long() {
    this.setTime = 2;
    this.currentTimer = this.setTime * 60
    this.start()
  }
  reset() {
    this.minutes = this.setTime
    this.seconds = 0;
    this.isActive = false;
  }
  stop() {
    this.isActive = false;
  };
  start() {
    this.isActive = true;
    if (this.setTime === undefined) {
      this.setTime = 2
      this.currentTimer = this.setTime * 60
    }
    this.timer = setInterval(() => {
      this.runTimer();
       console.log(this.currentTimer)
    }, 1000)
  }
  runTimer() {
    if (this.isActive) {
      this.currentTimer -= 1;
      console.log(this.currentTimer)
      this.timerZone(this.currentTimer);
      if (this.currentTimer <= 0) {
        clearInterval(this.timer)
        this.timerZone(this.currentTimer);
        return this.isActive = false
      }
    }
  };
  timerZone(time) {
    this.minutes = Math.floor(time / 60);
    this.seconds = time - this.minutes * 60;
  }
  doLogout() {
    localStorage.clear();
    this.navCtrl.setRoot(Login)
  }
}
