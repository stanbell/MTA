import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { NavoptionsPage } from '../navoptions/navoptions';
import { UserDataProvider } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public ud: UserDataProvider) {
    console.log('home constructor');
    this.auth.checkToken();
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  start() {
    console.log('home.start');
    this.ud.readData(this.auth.user);
    this.navCtrl.push(NavoptionsPage);
  }

  logout() {
    this.auth.logout();
  }

}
