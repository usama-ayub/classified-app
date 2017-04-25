import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/toPromise"
import { AppConfig } from "../app.config";
// import 'rxjs/add/operator/map';


@Injectable()
export class Auth {

  constructor(public http: Http) {
    console.log('Hello Auth Provider');
  }

  login({ email, password }) {
    let url = `${AppConfig.API_URL}/login`;
    return this.http.post(url, {
      email: email,
      password: password
    });
  }

  register({ firstName, lastName, email, password }) {
    let url = `${AppConfig.API_URL}/register`;
    return this.http.post(url, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }


  get uid() {
    return '58d3ea45279c3a27940f20c2';
  }

  get user() {
    return this.getUserData()
  }

  private getUserData(): any {
     return JSON.parse(localStorage.getItem('loginData'))
  }



}
