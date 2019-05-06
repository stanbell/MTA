import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Auth0Provider } from '../../providers/auth0/auth0';
import { NavoptionsPage } from '../navoptions/navoptions';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: Auth0Provider) {
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
