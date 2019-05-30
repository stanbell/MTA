import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SettingsPage } from '../settings/settings';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import { UserProvider } from '../../providers/user/user';
import '../../types/types';
import { EditContactPage } from '../edit-contact/edit-contact';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  biz: UserInfoType;
  itemIndex: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public user: UserProvider,
    public udw: UserDataWriterProvider) {
    this.user.read();
    this.biz = this.user.user;
  }

  save() {
    this.udw.write();
    this.navCtrl.pop();
  }

  addContact() {
    this.navCtrl.push(EditContactPage, {
      mode: 'add',
      item: this.biz
    })
  }

  editContact(c: ContactInfoType) {
    this.navCtrl.push(EditContactPage, {
      mode: 'edit',
      contact: c
    })
  }

  removeContact(i: number) {
    if (i < this.biz.contacts.length) this.biz.contacts.splice(i, 1);  // should never be, but
  }

  toggleTextOK(z: ContactInfoType) {
    z.okToText = !z.okToText;
  }

}
