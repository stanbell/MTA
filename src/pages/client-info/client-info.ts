import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import '../../types/types';
import { UserDataProvider } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-client-info',
  templateUrl: 'client-info.html',
})
export class ClientInfoPage {

  client: ClientType;
  itemIndex: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ud: UserDataProvider) {
      this.client = navParams.get('client');  // keeps a reference, ie edits apply directly
      // this.itemIndex = this.findItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientInfoPage');
  }


  // cancel() {
  //   this.navCtrl.pop();
  // }

  save() {
    this.ud.writeData();
    this.navCtrl.pop();
  }

  addContact() {
    console.log('addContact');
  }
  
  editContact() {
    console.log('editContact');

  }

  toggleTextOK(z: ContactInfoType) {
    z.okToText = !z.okToText;
  }

  // private findItem(): number {
  //   // this.
  //   return 0;
  // }
}
