import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import '../../types/types';
import { ClientsProvider } from '../../providers/clients/clients';
import { HelpersProvider } from '../../providers/helpers/helpers';

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
}
