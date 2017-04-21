import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { App } from '../../providers/app';
import { HomePage } from '../home/home';
import { Register } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loading: any;
  data: any;
  user = {
    email: '',
    password: ''
  }

  register: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private loadingCtrl: LoadingController, private app: App) {
    this.register = Register;
  }

  doLogin(user) {
    event.preventDefault();
    if (!user.valid) {
      console.log("false")
    } else {
      this.app.LoaderShow();
      this.auth.login(this.user)
        .subscribe(data => {
            let response = data.json()
            if (!response.success) {
              this.app.LoaderHide();
            }
            else {
              this.app.LoaderHide();
              localStorage.setItem('loginData', JSON.stringify(response.data));
              this.navCtrl.setRoot(HomePage)
              this.user = { email: '', password: '' }
            }
        })
    }
    //this.navCtrl.push(HomePage)
    // this.navCtrl.push(HomePage,data) data mean params
    //next page get param this.navParams.get()
  }
  ionViewDidLoad() {
    let confirmData = JSON.parse(localStorage.getItem('loginData'));
    if (confirmData) return this.navCtrl.push(HomePage);
  }

}
