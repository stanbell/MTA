import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DcsbAccountProvider } from '../../providers/dcsbaccount/dcsbaccount';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { DownloadPage } from '../download/download';
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
  expDate: string = "";

  ontheWeb: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public helper: HelpersProvider,
    public account: DcsbAccountProvider) {
    if (!this.plt.is('mobile')) {  // only allow account cancellation on the web
      this.ontheWeb = true;
    }
    this.nu = this.helper.deepCopy(this.account.nu);
    console.log(this.nu);
    var d: Date = new Date();
    d.setHours(0, 0, 0);
    this.expDate = d.toISOString();
    console.log(this.expDate);
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  // TODO create a cancel account option on web site

  updateBilling() {
    // TODO verify cc info immediately
    // TODO reset expiration date
    this.account.updateBilling(this.nu.billing);
  }


  resetPwd() {
    this.account.resetPwd(this.newPwd);
  }


  cancelAccount() {
    this.account.cancelAccount(this.nu._id);
    // TODO:  notify cancellation complete
  }

  gotoDownload() {
    this.navCtrl.push(DownloadPage);
  }
}
