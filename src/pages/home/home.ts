import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { NavoptionsPage } from '../navoptions/navoptions';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider) {
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  start() {
    this.navCtrl.push(NavoptionsPage);
  }

  logout() {
    this.auth.logout();
  }

}
