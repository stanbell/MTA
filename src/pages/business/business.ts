import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import { UserProvider } from '../../providers/user/user';
import '../../types/types';

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
  }

  editContact() {
    console.log('editContact');

  }

  toggleTextOK(z: ContactInfoType) {
    z.okToText = !z.okToText;
  }

}
