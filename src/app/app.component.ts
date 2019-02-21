import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Auth0Cordova } from '@auth0/cordova';
// import { SchedulePage } from '../pages/schedule/schedule';
import { ClientsPage } from '../pages/clients/clients';
import { TransactionsPage } from '../pages/transactions/transactions';
import { BusinessPage } from '../pages/business/business';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { UserDataProvider } from '../providers/user-data/user-data';
import { CalendarPage } from '../pages/calendar/calendar';
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

    // // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'My Schedule', component: CalendarPage },
    //   { title: 'My Clients', component: ClientsPage },
    //   { title: 'My Transactions', component: TransactionsPage },
    //   { title: 'My Business', component: BusinessPage },
    //   { title: 'Settings', component: SettingsPage },
    // ];

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

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
      this.nav.setRoot(HomePage);
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
