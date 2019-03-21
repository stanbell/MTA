import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { AppointmentsPage } from '../appointments/appointments';
import { ClientInfoPage } from '../client-info/client-info';
import '../../types/types';
import { TransactionsPage } from '../transactions/transactions';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  item: ClientType;  // ??
  itemIndex: number;
  metrics: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public helper: HelpersProvider,
    public clients: ClientsProvider) {
      this.itemIndex = navParams.get('item');
      this.item = helper.deepCopy(clients.clients[this.itemIndex]);
      console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }


  navTo(where: string): void {
    const FifteenDays = 15 * 24 * 60 * 60 * 1000;
    switch (where) {
      case 'client':
        this.navCtrl.push(ClientInfoPage, {
          client: this.item,
        });
        break;
      case 'appt':
        this.navCtrl.push(AppointmentsPage, {
          client: this.item,
              // TODO this needs to be calculated from the users's preferred date range
          start: new Date(Date.now()-FifteenDays).toISOString()
        });
        break;
      case 'trans':
        this.navCtrl.push(TransactionsPage, {
          // sending a filter value to show only this client's trans
          client: this.item,
              // TODO this needs to be calculated from the users's preferred date range
              // maybe or maybe not need this for trans
          start: new Date(Date.now()-FifteenDays).toISOString()
        });
        break;
    
      default:
        break;
    }
  }

  toggleMetrics() {
    this.metrics = !this.metrics;
  }
}
