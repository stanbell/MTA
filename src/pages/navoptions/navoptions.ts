import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { CalendarPage } from '../calendar/calendar';
import { ClientsPage } from '../clients/clients';
import { TransactionsPage } from '../transactions/transactions';
import { BusinessPage } from '../business/business';

@IonicPage()
@Component({
  selector: 'page-navoptions',
  templateUrl: 'navoptions.html',
})
export class NavoptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavoptionsPage');
  }


  navTo(where: string) {
    switch (where) {
      case 'sched':
          this.navCtrl.push(CalendarPage);
        break;
      case 'clients':
          this.navCtrl.push(ClientsPage);
        break;
      case 'trans':
          this.navCtrl.push(TransactionsPage);
        break;
      case 'biz':
          this.navCtrl.push(BusinessPage);
        break;
      case 'sets':
          this.navCtrl.push(SettingsPage);
        break;
      default:
        break;
    }
  }
}
