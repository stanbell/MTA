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
  }

  async pwdAvailable() {
    try {
      this.available = await (this.ud.checkIdAvailable(this.nu._id));
    } catch (error) {
      console.log(error);
    }
  }

  signup() {
    this.nu.price = this.getPrice();
    this.nu.expires = this.calcExpiration();
    this.nu.cancelled = "";
    this.udw.signup(this.nu);
    this.navCtrl.pop();
  }

  private calcExpiration(): string {
    var today = new Date();
    mon = today.getMonth();
    yr = today.getFullYear();
    var expires: Date, mon: number, yr: number;
    switch (this.nu.term) {
      case "1mo":
        mon += 1;
        if (mon === 12) { mon = 0; yr += 1; }
        expires = new Date((mon + 1) + "/" + today.getDate() + "/" + yr);
        break;
      case "3mo":
        mon += 3;
        yr = today.getFullYear();
        if (mon > 11) {
          mon = mon - 12;
          yr += 1;
        }
        expires = new Date((mon + 1) + "/" + today.getDate() + "/" + yr);
        break;
      case "1yr":
        yr += 3;
        expires = new Date((mon + 1) + "/" + today.getDate() + "/" + yr);
        break;
      default:  // 1mo
        mon += 1;
        if (mon === 12) { mon = 0; yr += 1; }
        expires = new Date((mon + 1) + "/" + today.getDate() + "/" + yr);
        break;
    }
    return expires.toISOString();
  }

  private getPrice(): number {
    var price: number;
    switch (this.nu.term) {
      case "1mo":
        price = 9.99;
        break;
      case "3mo":
        price = 27;
        break;
      case "1yr":
        price = 100;
        break;
      default:  // 1mo
        price = 9.99;
        break;
    }
    return price;
  }
}
