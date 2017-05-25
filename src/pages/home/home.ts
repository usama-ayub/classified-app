import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Observable } from "rxjs/Observable"
import { App } from '../../providers/app';
import { Auth } from '../../providers/auth';
import { Todo } from '../../providers/todo';
import { AddPost } from '../add-post/add-post';
import { PostDetailPage } from '../post-detail/post-detail';
import { AppConfig } from './../../app.config';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  post = [];
  userPost = [];
  todoDeleteObj: any;
  addPost: any;
  login: any;
  appConfig: any;
  constructor(public navCtrl: NavController, private auth: Auth, private todo: Todo, public popoverCtrl: PopoverController, private app: App) {
    this.addPost = AddPost
    this.login = Login
    this.appConfig = AppConfig.API_URL
  }
  ngOnInit() {
    this.auth.user ? this.getPostByUserID() : false;
    this.getPost();
  }


  addpostFunc() {
    this.navCtrl.push(AddPost)
      .catch((err) => {
        this.navCtrl.setRoot(Login)
      })
  }

  postDetailFunc(detail) {
    this.navCtrl.push(PostDetailPage, detail)
  }

  getPost() {
    this.app.LoaderShow();
    this.todo.getPost()
      .subscribe(data => {
        let response = data
        if (!response.success) {
          this.app.LoaderHide();
        }
        else {
          if (response.data.length > 0) {
            this.post = response.data;
            this.app.LoaderHide();
          } else {
            this.app.LoaderHide();
          }
        }
      })
  }


  getPostByUserID() {
    //this.app.LoaderShow();
    this.todo.getPostByUserID()
      .subscribe(data => {
        let response = data
        if (!response.success) {
          //this.app.LoaderHide();
        }
        else {
          if (response.data.length > 0) {
            this.userPost = response.data;
            console.log(this.userPost);
            //this.app.LoaderHide();
          } else {
           // this.app.LoaderHide();
          }
        }
      })
  }

}
