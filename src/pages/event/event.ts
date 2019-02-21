import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import '../../types/types';
import { HelpersProvider } from '../../providers/helpers/helpers';

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

}