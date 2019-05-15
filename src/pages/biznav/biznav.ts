import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusinessPage } from '../business/business';
import { BiztodayPage } from '../biztoday/biztoday';
import { SettingsPage } from '../settings/settings';
import { TransactionsPage } from '../transactions/transactions';
import { StatsPage } from '../stats/stats';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-biznav',
  templateUrl: 'biznav.html',
})
export class BiznavPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiznavPage');
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
      default:
        break;
    }
  }
}
