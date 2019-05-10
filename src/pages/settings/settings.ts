import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import '../../types/types';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import { EditServicePage } from '../edit-service/edit-service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  biz: UserInfoType;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
    public udw: UserDataWriterProvider) {
    this.biz = user.user;
  }

  save() {
    this.udw.write();
    this.navCtrl.pop();
  }


  addService() {
    console.log('addService');
    this.navCtrl.push(EditServicePage, {
      mode: 'add',
      item: this.biz
    })
  }

  editService(c: ServiceType) {
    console.log('editService');
    this.navCtrl.push(EditServicePage, {
      mode: 'edit',
      Service: c
    })
  }

  removeContact(c: ContactInfoType) {
    alert('not yet implememnted');
  }
}
