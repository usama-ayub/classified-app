import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { AddPost } from '../pages/add-post/add-post';
import { PostDetailPage } from '../pages/post-detail/post-detail';


import { App } from '../providers/app';
import { Auth } from '../providers/auth';
import { Todo } from '../providers/todo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Register,
    AddPost,
    PostDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Register,
    Login,
    AddPost,
    PostDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Todo,
    App,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
