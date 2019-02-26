import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { PaymentPage } from '../payment/payment';
import '../../types/types';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  future: boolean;
  event: ScheduleItemType;
  scheduleItemIndex: number;
  title: string;
  displayDate: string;
  displayStart: string;
  displayEnd: string;
  location: string;
  eventDate: Date;
  initialTransactions: TransactionType[];
  transactions: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
      // this.mode = navParams.get('mode');
      this.event = navParams.get('event');
      this.displayDate = (new Date(this.event.start).toLocaleDateString());
      this.displayStart = (new Date(this.event.start).toLocaleTimeString());
      this.displayEnd = (new Date(this.event.end).toLocaleTimeString());
      this.initialTransactions = this.matchTransactions(this.event.transactions, this.ud.userData.transactions);
      this.initialTransactions.forEach(e => e.type = this.upshiftInitial(e.type));
      this.transactions = helper.deepCopy(this.initialTransactions);
      this.transactions.forEach((e) => {
        e['formattedAmount'] = (e.amount >= 0) ? e.amount.toFixed(2) : "(" + (0 - e.amount).toFixed(2) + ")";
      });
      this.eventDate = new Date(this.event.start);
      this.future = (this.eventDate.valueOf() > Date.now());  // future, can edit
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  pay() {
    console.log('pay');
    this.navCtrl.push(PaymentPage, {
      event: this.event
    });
  }


  private matchTransactions(trans: any[], source: any[]): any[] {
    var t: string[] = new Array();
    trans.forEach(i => t.push(i.uniqueId));
    return source.filter(x => t.indexOf(x.uniqueId) !== -1);
    // var filteredTrans = source.filter(x => t.indexOf(x.uniqueId) !== -1);
    // return filteredTrans;
  }

  private upshiftInitial(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  // private defaultTitle: string = (!!this.ud.userData.user.defaultApptTitle) ? this.ud.userData.user.defaultApptTitle : 'Massage';
  // private defaultLocation: string =
  //   (!!this.ud.userData.user.address.label) ? this.ud.userData.user.address.label : 'Office';
  // addEvent(cal) {
  //   this.navCtrl.push(EventPage, {
  //     mode: 'add',
  //     title: this.defaultTitle, // set default in settings
  //     location: this.defaultLocation, // set in settings
  //     startDate: this.selectedDate
  //   })

  // // also sync to native calendar 
  // }
  
  // cancelEvent(cal) {
    // // also sync to native calendar 

  // }
}