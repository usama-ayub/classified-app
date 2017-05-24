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

  addPostObj: any;
  todoDeleteObj: any;
  addPost: any;
  login: any;
  appConfig: any;
  features: any;
  constructor(public navCtrl: NavController, private auth: Auth, private todo: Todo, public popoverCtrl: PopoverController, private app: App) {
    this.addPost = AddPost
    this.login = Login
    this.appConfig = AppConfig.API_URL
  }
  ngOnInit() {
    this.features = {
      slidesPerView: 4,
    }
    this.getPost();
    this.addPostObj = {
      posts: '',
      createBy: '',
      isLike: false
    };
    this.todoDeleteObj = {
      user_id: '',
      todo_id: ''
    };

  }


  addpostFunc() {
    this.navCtrl.push(AddPost)
      .catch((err) => {
        this.navCtrl.setRoot(Login)
      })
  }

  postDetailFunc(detail) {
    this.navCtrl.push(PostDetailPage, detail)
      .catch((err) => {
        this.navCtrl.setRoot(Login)
      })
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
            console.log(this.post.length)
            this.app.LoaderHide();
          }
        }
      })
  }




  deleteTodo(index) {
    this.post.splice(index, 1);
    this.todoDeleteObj = {
      user_id: index.CreateBy,
      todo_id: index._id
    }
    this.todo.deleteTodo(this.todoDeleteObj)
      .then(data => {
        if (data.status == 200) {
          //this.app.showToast()
        }
      })
  }
}
