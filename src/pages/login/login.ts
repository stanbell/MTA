import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  id: string;
  pwd: string;


  constructor(public navCtrl: NavController,
    public auth: AuthProvider) {
  }

  login() {
    this.auth.login(this.id, this.pwd);
    this.navCtrl.pop();
  }

  logout() {
    this.auth.logout();
    this.navCtrl.pop();
  }
  
  async mockLogIn() {
    this.auth.mockLogIn();
    this.navCtrl.pop();
  }

}