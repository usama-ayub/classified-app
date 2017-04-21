import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/toPromise"
import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map';
import { Auth } from '../providers/auth';
import { AppConfig } from "../app.config";


@Injectable()
export class Todo {

  constructor(public http: Http, private auth: Auth) {
    console.log('Hello Todo Provider');
  }

  addPost({ createBy, posts, isLike }): Promise<any> {
    let url = `${AppConfig.API_URL}/post/add`;
    return this.http.post(url, {
      createBy: createBy,
      posts: posts,
      isLike: isLike
    }).toPromise();
  }

  getPost(): Observable<any> {
    let url = `${AppConfig.API_URL}/post`;
    return this.http.get(url)
      .map(response => response.json());
  }

  addPostLike({ post_id, isLike }): Promise<any> {
    let url = `${AppConfig.API_URL}/post/like`;
    return this.http.put(url, {
      post_id: post_id,
      isLike: isLike,
    }).toPromise();
  }

  deleteTodo({ user_id, todo_id }): Promise<any> {
    let url = `${AppConfig.API_URL}/user/${user_id}/todo/${todo_id}`;
    return this.http.delete(url, {}).toPromise();


  }
}