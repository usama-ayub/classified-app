import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from '../../providers/app';
import { Todo } from '../../providers/todo';
import { PostDetailPage } from '../post-detail/post-detail';


@IonicPage()
@Component({
  selector: 'page-post-category',
  templateUrl: 'post-category.html',
})
export class PostCategoryPage implements OnInit {
  postCategory = [];
  category: any;;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todo: Todo,
     private app: App
  ) {
  }

  postDetailFunc(detail) {
    this.navCtrl.push(PostDetailPage, detail)
  }
  ngOnInit() {
    this.category = this.navParams.data;
    this.todo.getPostByCategory(this.category)
      .subscribe(data => {
        let response = data
         if (!response.success) {
           this.app.LoaderHide();
         }
         else {
           if (response.data.length > 0) {
             this.postCategory = response.data;
             this.app.LoaderHide();
           } else {
             this.app.LoaderHide();
           }
         }
      }) 
  }

  ionViewDidLoad() {

  }

}
