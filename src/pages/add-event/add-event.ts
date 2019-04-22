import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { LookupPage } from '../lookup/lookup';
import '../../types/types';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  startDate: any;
  endDate: any;
  event: ScheduleItemType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
    this.event = navParams.get('event');
    this.startDate = new Date(this.event.start).toISOString();
    this.endDate = new Date(this.event.end).toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter AddEventPage');
    console.log('lookupSelection:', this.helper.lookupSelection);
    if (!!this.helper.lookupSelection) {
      // returning from lookup
      switch (this.helper.lookupSelection.what) {
        case 'client':
          this.event.clientName = this.helper.lookupSelection.selected;
          break;
        case 'service':
          this.event.serviceDescription = this.helper.lookupSelection.selected;
          break;
        default:
          break;
      }
      // clear after use
      this.helper.lookupSelection = null;
    }
  }

  lookup(what: string): void {
    this.navCtrl.push(LookupPage,
      {
        type: what,
        searchTerm: this.helper.upshiftInitial(what)
      });
  }

}
