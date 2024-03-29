import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import '../../types/types';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import { EditContactPage } from '../edit-contact/edit-contact';

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

  save() {
    this.udw.write();
    this.navCtrl.pop();
  }

  addContact() {
    this.navCtrl.push(EditContactPage, {
      mode: 'add',
      item: this.client
    })
  }

  editContact(c: ContactInfoType) {
    this.navCtrl.push(EditContactPage, {
      mode: 'edit',
      contact: c
    })
  }

  removeContact(i: number) {
    if (i < this.client.contacts.length) this.client.contacts.splice(i, 1);  // should never be, but
  }

  toggleTextOK(z: ContactInfoType) {
    z.okToText = !z.okToText;
  }

}
