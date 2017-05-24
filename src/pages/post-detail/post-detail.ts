import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from '../../providers/app';
import { Todo } from '../../providers/todo';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private todo: Todo, private app: App) {

  }
  ngOnInit() {
    this.detail = this.navParams.data;
    this.appConfig = 'https://classified-app-server.herokuapp.com/api';
    this.isLikeObj = {
      post_id: '',
      isLike: false
    };
  }
  isLike(index) {
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
  ionViewDidLoad() {

  }

}
