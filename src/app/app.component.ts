import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Usuarios } from '../pages/usuarios/usuarios';
import { Produtos } from '../pages/produtos/produtos';
import { Meuestoque } from '../pages/meuestoque/meuestoque';
import { Meusclientes } from '../pages/meusclientes/meusclientes';
import { Vouvender } from '../pages/vouvender/vouvender';

import { BackandService } from '@backand/angular2-sdk';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public backand: BackandService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Usuários', component: Usuarios },
      { title: 'Produtos', component: Produtos },
      { title: 'Meu Estoque', component: Meuestoque },
      { title: 'Vou Vender', component: Vouvender },
      { title: 'Meus Clientes', component: Meusclientes },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backand.init({
        appName: 'Proj1',
        signUpToken: 'd28a16f6-ecbc-46f1-a7be-efbdc45f1e30',
        anonymousToken: 'c406c73c-3688-4828-a734-004ac04b04d0',
        runSocket: true,
        mobilePlatform: 'ionic'
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
