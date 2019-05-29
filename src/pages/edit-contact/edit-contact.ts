import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmptiesProvider } from '../../providers/empties/empties';
import '../../types/types';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';


@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {

  item: any;
  contact: ContactInfoType;
  mode: string = 'edit';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public empties: EmptiesProvider,
    public udw: UserDataWriterProvider) {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'edit') {
      this.contact = this.navParams.get('contact');
    } else {
      this.item = this.navParams.get('item');
      this.contact = empties.getEmptyContact();
    }
  }

  save() {
    if (this.mode === 'add') {
      this.item['contacts'].push(this.contact);
    }
    this.udw.write();
    this.navCtrl.pop();
  }
}
