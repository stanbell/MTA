import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { ClientsPage } from '../clients/clients';
import { BiznavPage } from '../biznav/biznav';

@IonicPage()
@Component({
  selector: 'page-navoptions',
  templateUrl: 'navoptions.html',
})
export class NavoptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navTo(where: string) {
    switch (where) {
      case 'sched':
          this.navCtrl.push(CalendarPage);
        break;
      case 'clients':
          this.navCtrl.push(ClientsPage);
        break;
      // case 'trans':
      //     this.navCtrl.push(TransactionsPage);
        // break;
      case 'biz':
          this.navCtrl.push(BiznavPage);
        break;
      // case 'stats':
      //     this.navCtrl.push(StatsPage);
      //   break;
      default:
        break;
    }
  }
}
