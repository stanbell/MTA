import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  save() {
    this.udw.write();
    this.navCtrl.pop();
  }

  addContact() {
    console.log('addContact');
    this.navCtrl.push(EditContactPage, {
      mode: 'add',
      item: this.biz
    })
  }

  editContact(c: ContactInfoType) {
    console.log('editContact');
    this.navCtrl.push(EditContactPage, {
      mode: 'edit',
      contact: c
    })
  }

  removeContact(c: ContactInfoType) {
    alert('not yet implememnted');
  }

  toggleTextOK(z: ContactInfoType) {
    z.okToText = !z.okToText;
  }

}
