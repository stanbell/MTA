import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { UserDataProvider } from '../providers/user-data/user-data';
import { TransactionsProvider } from '../providers/transactions/transactions';
import { ScheduleProvider } from '../providers/schedule/schedule';

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
    public trans: TransactionsProvider,
    public sched: ScheduleProvider,
    public ud: UserDataProvider) {
      this.initializeApp();
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        if (this.platform.is('cordova')) {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }
        
        // initialize primary data store
        this.ud.initData();
        this.trans.init();
        this.sched.init();
        
        this.nav.setRoot(HomePage);
      });
    }
    
}


// FAILED auth0 code
// import { Auth0Cordova } from '@auth0/cordova';
// // Redirect back to app after authenticating
// (window as any).handleOpenURL = (url: string) => {
  //   console.log(url);
  //   alert('handleOpenURL callback ' + url);
  //   Auth0Cordova.onRedirectUri(url);
  //   alert('after onRedirectUri');
  // }
