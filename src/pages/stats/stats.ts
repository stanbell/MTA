import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { ScheduleProvider } from '../../providers/schedule/schedule';

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {


  timePeriod: string = '';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // public trans: TransactionsProvider,
    public sched: ScheduleProvider) {
    // this.trans.read();
    this.sched.read();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
    this.computeStats();
    // filter for time period--do this in sched & trans?  yes
    this.sched.scheduleItems.forEach((s) => {
      if (new Date(s.end).valueOf() < Date.now().valueOf()) {
        // past
        switch (s.completionState) {
          case 'Done':
            this.previousAppts += 1;
            if (s.pd) {
              this.revenue += s.revenue;
            } else {
              this.uncollected += s.revenue;
            }
            break;
          case 'Open':
            this.inComplete += 1;
            this.previousAppts += 1;
            if (s.pd) {
              this.revenue += s.revenue;
            } else {
              this.uncollected += s.revenue;
            }
            break;
          case 'No Show':
            this.noShowAppts += 1;
            this.lostRevenue += s.revenue;
            break;
          case 'Cancelled':
            this.cancellations += 1;
            this.lostRevenue += s.revenue;
            break;
          default:
            break;
        }
      } else {
        // future
        this.scheduledAppts += 1;
        this.scheduledRevenue += s.revenue;
      }
    });
  }

  computeStats() {

  }
}
