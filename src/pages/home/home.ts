import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { NavoptionsPage } from '../navoptions/navoptions';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { SignupPage } from '../signup/signup';
import { DcsbAccountProvider } from '../../providers/dcsbaccount/dcsbaccount';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public account: DcsbAccountProvider,
    public ud: UserDataProvider) {
    this.auth.checkToken();
  }

  login() {
    this.navCtrl.push(LoginPage);
  }


  start() {
    console.log('home.start');
    this.account.getAccount();
    this.ud.readData(this.auth.user);
    this.navCtrl.push(NavoptionsPage);
  }

  logout() {
    this.auth.logout();
  }

  signup() {
    // WORKING HERE
    // go to client page w/signup option
    this.navCtrl.push(SignupPage);
  }
}
