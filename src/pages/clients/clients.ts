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
  searchTerm: string;

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

  selectItem(item: any) {
    this.navCtrl.push(ClientPage, {
      item: item
     })
  }

  populateItems() {
    this.itemsList = [];
    // TODO:  filter to search term
    for (let i = 0; i < this.clients.clients.length; i++) {
      this.itemsList.push(this.clients.clients[i]);
    }

  }

  addClient() {
    console.log('addClient');
  }

}
