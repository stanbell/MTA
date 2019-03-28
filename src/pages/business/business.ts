import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import '../../types/types';
import { SettingsPage } from '../settings/settings';

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
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
    this.biz = ud.userData.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }
  // cancel() {
  //   this.navCtrl.pop();
  // }
  settings() {
    this.navCtrl.push(SettingsPage);
  }

  save() {
    this.ud.userData.user = this.helper.deepCopy(this.biz);
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

}
