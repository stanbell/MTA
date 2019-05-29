import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BusinessPage } from '../business/business';
import { BiztodayPage } from '../biztoday/biztoday';
import { SettingsPage } from '../settings/settings';
import { TransactionsPage } from '../transactions/transactions';
import { StatsPage } from '../stats/stats';
import { AccountPage } from '../account/account';
import { DownloadPage } from '../download/download';

@IonicPage()
@Component({
  selector: 'page-biznav',
  templateUrl: 'biznav.html',
})
export class BiznavPage {

  onTheWeb: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform) {
    this.onTheWeb = (!this.plt.is('mobile'));
  }

  navTo(where: string) {
    switch (where) {
      case 'today':
        this.navCtrl.push(BiztodayPage);
        break;
      case 'stats':
        this.navCtrl.push(StatsPage);
        break;
      case 'trans':
        this.navCtrl.push(TransactionsPage);
        break;
      case 'biz':
        this.navCtrl.push(BusinessPage);
        break;
      case 'settings':
        this.navCtrl.push(SettingsPage);
        break;
      case 'account':
        this.navCtrl.push(AccountPage);
        break;
      case 'download':
        this.navCtrl.push(DownloadPage);
        break;
      default:
        break;
    }
  }
}
