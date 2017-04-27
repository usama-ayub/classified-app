import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

/*
  Generated class for the App provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class App {
  private loading: any;
  toast: any;

  constructor(public http: Http, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private auth: Auth) {

    console.log('Hello App Provider');
  }
  userCheck() {
    if (this.auth.user == null) {
      return false
    } else {
      return true;
    }
  }
  LoaderShow() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  LoaderHide() {
    if (this.loading) this.loading.dismissAll()
  }

  showToast(text) {
    this.toast = this.toastCtrl.create({
      message: text,
      duration: 1000,
      position: 'bottom'
    });
    this.toast.present();
  }

  hideToast() {
    if (this.toast) this.toast.dismiss()
  }
}
