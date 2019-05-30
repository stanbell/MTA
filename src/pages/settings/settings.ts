import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import '../../types/types';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import { EditServicePage } from '../edit-service/edit-service';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { ClientsProvider } from '../../providers/clients/clients';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  biz: UserInfoType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public trans: TransactionsProvider,
    public sched: ScheduleProvider,
    public clients: ClientsProvider,
    public user: UserProvider,
    public udw: UserDataWriterProvider) {
    user.read();
    this.biz = user.user;
  }

  save() {
    this.udw.updateDataWindow();
    this.trans.init();
    this.sched.init();
    this.clients.init();
    this.udw.write();
    this.navCtrl.pop();
  }


  addService() {
    this.navCtrl.push(EditServicePage, {
      mode: 'add',
      item: this.biz
    })
  }

  editService(c: ServiceType) {
    this.navCtrl.push(EditServicePage, {
      mode: 'edit',
      Service: c
    })
  }

  removeService(i: number) {
    if (i < this.biz.services.length) this.biz.services.splice(i, 1);  // should never be, but
  }
}
