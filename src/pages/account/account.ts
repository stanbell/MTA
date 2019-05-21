import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { HelpersProvider } from '../../providers/helpers/helpers';
import '../../types/types';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {


  nu: SystemUserType;
  newPwd: string = "";
  verifyPwd: string = "";
  confirmId: string = "";

  ontheWeb: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public helper: HelpersProvider,
    public account: AccountProvider) {
    if (!this.plt.is('mobile')) {  // only allow account cancellation on the web
      this.ontheWeb = true;
    }
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


  cancelAccount() {
    this.account.cancelAccount(this.nu.id);
    // TODO:  notify cancellation complete
  }

  gotoDownload() {

  }
}
