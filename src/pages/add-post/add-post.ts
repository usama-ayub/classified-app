import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { Todo } from '../../providers/todo';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPost implements OnInit {
  addPostObj: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private todo: Todo) {
  }
  ngOnInit() {
    this.addPostObj = {
      name: '',
      description: '',
      img: '',
      category: '',
      isLike: false,
      createBy: this.auth.uid,
    };
  }
  postImage() { }
  addPost(post) {
    if (!post.valid) {
      console.log('false')
    }
    else {
      this.todo.addPost(this.addPostObj)
        .subscribe(data => {
          console.log(data)
          console.log(data.json())
          let response = data.json();
          console.log(response)
          if (!response.success) {
            console.log(response.error)
          }
          else {
            this.navCtrl.setRoot(HomePage)
          }
        })
    }


  }
}
