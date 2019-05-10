import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { UserDataProvider } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {


  // timePeriod: string = '';
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
    public ud: UserDataProvider,
    public sched: ScheduleProvider) {
    this.sched.read();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
    this.computeStats();
  }

  computeStats() {
    // filter for time period--do this in sched & trans?  yes
    console.log('number of items', this.sched.scheduleItems.length);
    this.sched.scheduleItems.forEach((s) => {
      if (new Date(s.start).valueOf() < Date.now().valueOf()) {
        // past
        switch (s.completionState) {
          case 'Completed':
            this.previousAppts += 1;
            this.revenue += s.revenue;
            if (s.pd) {
              this.paid += s.revenue;
            } else {
              this.uncollected += s.revenue;
            }
            break;
          case '':
            s.completionState = 'Open';  // if needed
            // falls thru 'Open' case
          case 'Open':
            this.inComplete += 1;
            this.previousAppts += 1;
            this.revenue += s.revenue;
            if (s.pd) {
              this.paid += s.revenue;
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
            console.log('unrecognized case');
            break;
        }
      } else {
        // future
        this.scheduledAppts += 1;
        this.scheduledRevenue += s.revenue;
      }
      // console.log(s.revenue);
      // console.log(s.completionState);
    });
  }
}
