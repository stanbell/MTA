import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Auth0Provider } from '../../providers/auth0/auth0';
import { UserDataProvider } from '../../providers/user-data/user-data';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public auth: Auth0Provider,
    public ud: UserDataProvider) {
  }

  login() {
    console.log('logging in');
    this.auth.login();
    this.navCtrl.pop();
  }

  logout() {
    console.log('logging out');
    this.auth.logout();
    this.navCtrl.pop();
  }

  async mockLogIn() {
    this.ud.userId = 'joe';
    await this.ud.readIdNumber();
    await this.ud.readData();
    this.auth.loggedIn = true;
    console.log('got', this.ud.userData);
    this.navCtrl.pop();
  }

}