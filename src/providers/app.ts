import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class App {
  private loading: any;
  toast: any;
  userObj = { _id: '', name: '', firstName: '', email: '' };
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
  userIsLoginSet(user) {
    this.userObj._id = user.data._id;
    this.userObj.firstName = user.data.firstName;
    this.userObj.email = user.data.email;
  }
  userIsLoginGet() {
    return this.userObj;
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
