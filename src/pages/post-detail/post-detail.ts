import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { App } from '../../providers/app';
import { Todo } from '../../providers/todo';
import { Auth } from './../../providers/auth';
import { AppConfig } from './../../app.config';

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage implements OnInit {
  detail: any;
  isLikeObj: any;
  appConfig: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private todo: Todo,
    private app: App,
    private auth: Auth
  ) {

  }
  ngOnInit() {
    this.detail = this.navParams.data;
    this.appConfig = AppConfig.API_URL;
    this.isLikeObj = {
      post_id: '',
      isLike: false
    };
  }
  isLike(index) {
    if (!this.auth.user) {
      return this.showAlert();
    }
    this.app.LoaderShow();
    this.isLikeObj = {
      post_id: index._id,
      isLike: !index.isLike
    }
    /*  this.todo.addPostLike(this.isLikeObj)
        .then(data => {
          if (data.status == 200) {
            this.post.map(item => {
              if (item._id == index._id) {
                item.isLike = !index.isLike;
              }
            })
          }
          this.app.LoaderHide();
        })*/
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Login Please',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        },
      }, {
        text: 'go to Login',
        handler: () => {
          this.navCtrl.setRoot(Login)
        }
      }]
    });
    alert.present();
  }
  ionViewDidLoad() {

  }

}
