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
    console.log('logging in');
    this.auth.login(this.id, this.pwd);
    this.navCtrl.pop();
  }

  logout() {
    console.log('logging out');
    this.auth.logout();
    this.navCtrl.pop();
  }
  
  async mockLogIn() {
    this.auth.mockLogIn();
    this.navCtrl.pop();
  }

}