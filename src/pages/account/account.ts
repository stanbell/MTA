import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import '../../types/types';
import { AuthProvider } from '../../providers/auth/auth';
import { AccountProvider } from '../../providers/account/account';
import { HelpersProvider } from '../../providers/helpers/helpers';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {


  nu: SystemUserType;
  newPwd: string = "";
  verifyPwd: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public account: AccountProvider) {
    this.nu = this.helper.deepCopy(this.account.nu);
    console.log(this.nu);
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  // TODO create a cancel account option on web site

  updateBilling() {
    // TODO verify cc info immediately
    this.account.updateBilling(this.nu.billing);
  }


  resetPwd() {
    this.account.resetPwd(this.newPwd);
  }

}
