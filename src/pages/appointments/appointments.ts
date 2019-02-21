import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { EventPage } from '../event/event';
import '../../types/types';

const ShortMonths: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {

  client: any;
  start: any;
  initialList: ScheduleItemType[];
  eventList: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
      this.client = navParams.get('client');// get the parms,
      this.start = navParams.get('start');// get the parms,
      // get the list filtered by the parms
      this.getClientEvents();
      this.decorateClientEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentsPage');
  }

  selectEvent(event: any) {
    // pick this event, go to appt details
    this.navCtrl.push(EventPage, {
      event: event,
      // mode: 'edit'
    })
  }

  private getClientEvents() {
    // filter the ud..schedule to those for this client
    this.initialList =
      this.ud.userData.schedule
        .filter(x => (this.client.name === x.clientName));
  }
  private decorateClientEvents() {
    this.initialList.forEach((e) => {
      var o = this.helper.deepCopy(e);
      o['startTime'] = this.formatTime(e.start);
      // o['startTime'] += ((d.getHours() > 12) ? 'pm' : 'am');
      o['startDate'] = this.formatDate(e.start); 
      this.eventList.push(o);
    });
  }

  private formatDate(dt: string): string {
    const d = new Date(dt);
    return ShortMonths[d.getMonth()] + ' ' + d.getDate();
    // return ShortMonths[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  private formatTime(dt: string): string {
    const d = new Date(dt);
    // strip the seconds from the time
    var mins = '0' + d.getMinutes().toString(); // pad w 0
    mins = mins.substr(mins.length - 2); // last 2 chars ensures leading 0
    const ampm = ((d.getHours() > 12) ? 'pm' : 'am');
    const hrs = (ampm === 'pm') ? (d.getHours() - 12).toString() : d.getHours().toString();
    return hrs + ':' + mins + ampm;
  }
}
