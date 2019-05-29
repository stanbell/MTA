import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { AppointmentsPage } from '../appointments/appointments';
import { ClientInfoPage } from '../client-info/client-info';
import { TransactionsPage } from '../transactions/transactions';
import { IntakePage } from '../intake/intake';
import { EmptiesProvider } from '../../providers/empties/empties';
import '../../types/types';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  item: ClientType; 
  mode: string;
  metrics: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public empties: EmptiesProvider,
    public clients: ClientsProvider) {
    this.mode = navParams.get('mode');
    if (this.mode === 'add') {
      this.item = this.empties.getEmptyClient();
      this.clients.add(this.item);
    } else {
      this.item = navParams.get('item');
      // this.item = clients.clients[this.itemIndex]; // this keeps a reference 
    }
  }

  navTo(where: string): void {
    const FIFTEENDAYS = 15 * 24 * 60 * 60 * 1000;
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
          start: new Date(Date.now() - FIFTEENDAYS).toISOString()
        });
        break;
      case 'trans':
        this.navCtrl.push(TransactionsPage, {
          // sending a filter value to show only this client's trans
          client: this.item,
          // TODO this needs to be calculated from the users's preferred date range
          // maybe or maybe not need this for trans
          start: new Date(Date.now() - FIFTEENDAYS).toISOString()
        });
        break;
      case 'intake':
        console.log('intake');
        this.navCtrl.push(IntakePage, {
          client: this.item,
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
