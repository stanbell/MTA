import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { TransactionsProvider } from '../../providers/transactions/transactions';

@IonicPage()
@Component({
  selector: 'page-biztoday',
  templateUrl: 'biztoday.html',
})
export class BiztodayPage {

  previousAppts: number = 0;
  revenue: number = 0;
  paid: number = 0;
  uncollected: number = 0;
  inComplete: number = 0;
  noShowAppts: number = 0;
  cancellations: number = 0;
  lostRevenue: number = 0;
  scheduledAppts: number = 0;
  scheduledRevenue: number = 0;
  discounts: number = 0;
  cash: number = 0;
  checks: number = 0;
  tips: number = 0;
  fees: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public sched: ScheduleProvider,
    public trans: TransactionsProvider) {
    this.sched.read();
    this.trans.read();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiztodayPage');
    this.computeStats();
  }

  computeStats() {
    // from schedule items
    // filter for today
    var todaysDate: Date = new Date();
    todaysDate.setHours(0, 0, 0);
    // console.log('todaysDate', todaysDate.valueOf());
    var s: ScheduleItemType[] = [];
    s = this.sched.scheduleItems.filter((f) => {
      var compDate: Date = new Date(f.start);
      compDate.setHours(0, 0, 0);
      // console.log('compDate', compDate.valueOf());
      return (compDate.valueOf() === todaysDate.valueOf());
    });

    // console.log('number of items', s.length);
    s.forEach((i) => {
      switch (i.completionState) {
        case 'Completed':
          this.previousAppts += 1;
          this.revenue += i.revenue;
          if (i.pd) {
            this.paid += i.revenue;
          } else {
            this.uncollected += i.revenue;
          }
          break;
        case '':
          i.completionState = 'Open';  // if needed
        // falls thru 'Open' case
        case 'Open':
          this.inComplete += 1;
          this.previousAppts += 1;
          this.revenue += i.revenue;
          if (i.pd) {
            this.paid += i.revenue;
          } else {
            this.uncollected += i.revenue;
          }
          break;
        case 'No Show':
          this.noShowAppts += 1;
          this.lostRevenue += i.revenue;
          break;
        case 'Cancelled':
          this.cancellations += 1;
          this.lostRevenue += i.revenue;
          break;
        default:
          console.log('unrecognized case');
          break;
      }
      this.scheduledAppts += 1;
      this.scheduledRevenue += i.revenue;
    });

    // from transactions
    // filter for today
    var t: TransactionType[] = [];
    t = this.trans.transactions.filter((f) => {
      var compDate: Date = new Date(f.date);
      compDate.setHours(0, 0, 0);
      // console.log('compDate', compDate.valueOf());
      return (compDate.valueOf() === todaysDate.valueOf());
    });

    console.log('number of items', t.length);
    t.forEach((i) => {
      switch (i.type) {
        case 'Cash':
          this.cash += i.amount;
          break;
        case 'Check':
          this.checks += i.amount;
          break;
        case 'Tip':
          this.tips += i.amount;
          break;
        case 'Dsc':
          this.discounts += i.amount;
          break;
        case 'Fee':
          this.fees += i.amount;
          break;
        default:
          console.log('unrecognized case');
          break;
      }
    });
  }
}
