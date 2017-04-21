import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App } from '../../providers/app';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { Login } from '../login/login';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  data: any;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  login: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private app: App) {
    this.login = Login;
  }

  doRegister(user) {
    if (!user.valid) {
      console.log("false")
    } else {
      this.app.LoaderShow();
      this.auth.register(this.user)
        .subscribe(data => {
          let response = data.json()
          if (!response.success) {
            this.app.LoaderHide();
          } else {
            this.app.LoaderHide();
            this.navCtrl.setRoot(HomePage)
            localStorage.setItem('loginData', JSON.stringify(response.data));
            this.user = {
              firstName: '',
              lastName: '',
              email: '',
              password: ''
            }
          }



        }, error => {
          console.log("Error happened" + error)
        })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

}
