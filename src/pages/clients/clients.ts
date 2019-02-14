import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ClientsProvider } from '../../providers/clients/clients';
import { ClientPage } from '../client/client';
@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  itemsList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public clients: ClientsProvider) {
    clients.read();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
    console.log('clients', this.clients.clients);
    this.populateItems();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave ClientsPage');
    // this.saveItems()  ???
    this.clients.write();
  }

  choose(item: any) {
    this.navCtrl.push(ClientPage, {
      item: item
     })
  }

  populateItems() {
    this.itemsList = [];
    let ttl: number = 0;
    for (let i = 0; i < this.clients.clients.length; i++) {
      this.itemsList.push(this.clients.clients[i]);
      let d = new Date(this.itemsList[i].date);
      let y = d.getFullYear().toString();
      y = y.substr(2, 2);
      this.itemsList[i]['formattedSch'] = this.itemsList[i].scheduledAppts.toFixed(0);
      this.itemsList[i]['formattedNoS'] = this.itemsList[i].noShowAppts.toFixed(0);
      this.itemsList[i]['formattedPrv'] = this.itemsList[i].previousAppts.toFixed(0);
      this.itemsList[i]['recurringIcon'] =
        (this.itemsList[i].recurringScheduled)
          ? 'checkmark-circle'
          : 'none';
      ttl += this.itemsList[i].scheduledAppts;
    }
    this.itemsList.push({
      name: 'Total Scheduled',
      formattedSch: ttl.toFixed(0),
      formattedNoS: '',
      formattedPrv: '',
      recurringIcon: 'none'
    })
  }
}

/* <!--nn: string,
  name: string,
    address: AddressType,
      contacts: ContactInfoType[],
        previousAppts: number,
          noShowAppts: number,
            scheduledAppts: number,
              recurringScheduled: boolean-- > */