import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import '../../types/types';

@IonicPage()
@Component({
  selector: 'page-client-info',
  templateUrl: 'client-info.html',
})
export class ClientInfoPage {

  client: ClientType;
  itemIndex: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.client = navParams.get('client');
      this.itemIndex = this.findItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientInfoPage');
  }


  cancel() {
    this.navCtrl.pop();
  }

  save() {
    // this.clients.clients[this.itemIndex] = this.helper.deepCopy(this.item);
    this.navCtrl.pop();
  }

  addContact() {

  }

  editContact() {

  }
  
  private findItem(): number {
    // this.
    return 0;
  }
}
