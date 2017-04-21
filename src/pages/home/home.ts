import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable"
import { App } from '../../providers/app';
import { Auth } from '../../providers/auth';
import { Todo } from '../../providers/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  post = [];
  postContent = {
    posts: '',
    isLike: false
  };
  addPostObj: any;
  isLikeObj: any;
  todoDeleteObj: any;
  constructor(public navCtrl: NavController, private auth: Auth, private todo: Todo, private app: App) {

  }
  ngOnInit() {
    this.getPost()

    this.addPostObj = {
      posts: '',
      createBy: '',
      isLike: false
    }
    this.isLikeObj = {
      post_id: '',
      isLike: false
    }
    this.todoDeleteObj = {
      user_id: '',
      todo_id: ''
    }
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

  addPost(postContent) {
    this.post.push(Object.assign({}, postContent))
    this.addPostObj = {
      posts: postContent.posts,
      createBy: this.auth.uid,
      isLike: postContent.isLike
    }
    this.todo.addPost(this.addPostObj)
      .then(data => {
        let response = data.json();
        if(!response.success){

        }
        else{
          this.getPost()
        }
      })
    postContent.posts = ''
  }


  isLike(index) {
    this.app.LoaderShow();
    this.isLikeObj = {
      post_id: index._id,
      isLike: !index.isLike
    }
    this.todo.addPostLike(this.isLikeObj)
      .then(data => {
        if (data.status == 200) {
          this.post.map(item => {
            if (item._id == index._id) {
              item.isLike = !index.isLike;
            }
          })
        }
        this.app.LoaderHide();
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
          this.app.showToast()
        }
      })
  }
}
