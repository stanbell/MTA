import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmptiesProvider } from '../../providers/empties/empties';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  nu: NewUserType;
  available: boolean = false;
  verifyPwd: string = "";

  // id: string = "";
  // pwd: string = "";
  // businessName: string = "";
  // ccName: string = "";
  // cc: string = "";
  // expDate: Date;
  // secCode: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public empties: EmptiesProvider,
    public udw: UserDataWriterProvider) {
      this.nu = this.empties.getEmptyNewUser();
      console.log(this.nu);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  pwdAvailable() {
    // TODO:  code to check this
    this.available = true;
  }

  signup() {
    this.udw.signup(this.nu);
    // alert('Sorry, Set up was not successful');
    // alert('Set up successful');
    this.navCtrl.pop();
  }

}
