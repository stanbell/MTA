import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmptiesProvider } from '../../providers/empties/empties';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import { UserDataProvider } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  nu: SystemUserType;
  available: boolean = false;
  verifyPwd: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public empties: EmptiesProvider,
    public udw: UserDataWriterProvider,
    public ud: UserDataProvider) {
      this.nu = this.empties.getEmptyNewUser();
      console.log(this.nu);
  }

  async pwdAvailable() {
    try {
      this.available = await (this.ud.checkIdAvailable(this.nu._id));
    } catch (error) {
      console.log(error);
    }
  }

  signup() {
    this.nu.expires = new Date().toISOString();
    this.nu.cancelled = "";
    this.udw.signup(this.nu);
    this.navCtrl.pop();
  }

}
