import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { Auth0Cordova } from '@auth0/cordova';

import { HomePage } from '../pages/home/home';
import { UserDataProvider } from '../providers/user-data/user-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public ud: UserDataProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // initialize primary data store
      this.ud.initData();
      // TODO: see if user already/previously logged in
      // this.auth.

      // FAILED auth0 code
      // // Redirect back to app after authenticating
      // (window as any).handleOpenURL = (url: string) => {
      //   console.log(url);
      //   alert('handleOpenURL callback ' + url);
      //   Auth0Cordova.onRedirectUri(url);
      //   alert('after onRedirectUri');
      // }
      this.nav.setRoot(HomePage);
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
