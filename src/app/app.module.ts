import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import io from 'socket.io-client';
window["io"] = io;
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Usuarios } from '../pages/usuarios/usuarios';
import { Produtos } from '../pages/produtos/produtos';
import { Meuestoque } from '../pages/meuestoque/meuestoque';
import { Meusclientes } from '../pages/meusclientes/meusclientes';
import { Vouvender } from '../pages/vouvender/vouvender';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackandService } from '@backand/angular2-sdk';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Usuarios,
    Produtos,
    Meuestoque,
    Vouvender,
    Meusclientes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Usuarios,
    Produtos,
    Meuestoque,
    Vouvender,
    Meusclientes
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackandService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
