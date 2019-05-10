import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmptiesProvider } from '../../providers/empties/empties';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import '../../types/types';

@IonicPage()
@Component({
  selector: 'page-edit-service',
  templateUrl: 'edit-service.html',
})
export class EditServicePage {
  item: any;
  service: ServiceType;
  mode: string = 'edit';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public empties: EmptiesProvider,
    public udw: UserDataWriterProvider) {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'edit') {
      this.service = this.navParams.get('service');
    } else {
      this.item = this.navParams.get('item');
      this.service = empties.getEmptyService();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditServicePage');
  }

  save() {
    if (this.mode === 'add') {
      this.item['services'].push(this.service);
    }
    this.udw.write();
    this.navCtrl.pop();
  }
}
