import { Auth } from './../providers/auth';
import { App } from './../providers/app';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { AddPost } from '../pages/add-post/add-post';
import { PostDetailPage } from '../pages/post-detail/post-detail';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  logout: any;
  ID: any;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: Auth, public app: App) {
    this.initializeApp();
    this.ID = this.app.userIsLoginGet();
    console.log(this.ID);
    this.pages = [
      { title: 'Login', component: Login },
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Register', component: Register },
      { title: 'List', component: ListPage },
      { title: 'Add Post', component: AddPost },
      { title: 'Post Detail', component: PostDetailPage },
    ];

  }

  initializeApp() {    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // if(JSON.parse(localStorage.getItem('loginData')).data) return this.navCtrl.push(HomePage)
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  doLogout() {
    this.app.userIsLoginGet();
    this.nav.setRoot(HomePage)
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
