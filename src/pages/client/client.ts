import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import '../../types/types';
import { ClientsProvider } from '../../providers/clients/clients';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { AppointmentsPage } from '../appointments/appointments';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  item: ClientType;  // ??
  itemIndex: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public helper: HelpersProvider,
    public clients: ClientsProvider) {
      this.itemIndex = navParams.get('item');
      this.item = helper.deepCopy(clients.clients[this.itemIndex]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }


  cancel() {
    this.navCtrl.pop();
  }

  save() {
    this.clients.clients[this.itemIndex] = this.helper.deepCopy(this.item);
    this.navCtrl.pop();
  }

  navTo(where: string): void {
    const FifteenDays = 15 * 24 * 60 * 60 * 1000;
    switch (where) {
      case 'appt':
        this.navCtrl.push(AppointmentsPage, {
          client: this.item,
              // TODO this needs to be calculated from the users's preferred date range
          start: new Date(Date.now()-FifteenDays).toISOString()
        });
        break;
    
      default:
        break;
    }
  }
}
