import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import '../../types/types';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';

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
    public udw: UserDataWriterProvider) {
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
    this.udw.write();
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

}
