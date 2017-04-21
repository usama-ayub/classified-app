import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
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
  constructor(public http: Http, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    console.log('Hello App Provider');
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

  showToast() {
    this.toast = this.toastCtrl.create({
      message:"Remove Successfully",
      duration: 1000,
      position: 'bottom'
    });
    this.toast.present();
  }

  hideToast() {
    if (this.toast) this.toast.dismiss()
  }
}
