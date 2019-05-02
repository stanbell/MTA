import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ClientsProvider } from '../../providers/clients/clients';
import { ClientPage } from '../client/client';
import { EmptiesProvider } from '../../providers/empties/empties';
@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  itemsList: any;
  searchTerm: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public mt: EmptiesProvider,
    public clients: ClientsProvider) {
    clients.read();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
    console.log('clients', this.clients.clients);
    this.populateItems();
  }

  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave ClientsPage');
  //   // this.saveItems()  ???
  //   this.clients.write();
  // }

  editItem(item: ClientType) {
    this.navCtrl.push(ClientPage, {
      mode: 'edit',
      item: item
    })
  }

  populateItems() {
    // this.itemsList = [];
    this.itemsList = (!!this.searchTerm)
      ? this.itemsList = this.clients.clients
        .filter(x => x.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
      : this.itemsList = this.clients.clients;
  }

  addItem() {
    console.log('addClient');
    this.navCtrl.push(ClientPage, {
      mode: 'add'
    })
  }

}
