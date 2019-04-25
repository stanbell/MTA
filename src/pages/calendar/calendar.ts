import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { EventPage } from '../event/event';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { EmptiesProvider } from '../../providers/empties/empties';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { AddEventPage } from '../add-event/add-event';

const normalDaysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leapDaysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

const HOUR_VALUE = 1000 * 60 * 60;

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  title: any = 'Schedule';  // whose calendar is it?  title on page

  selectedDate: any;  // determines red highlight, changed by click on date
  selectedDayOfMonth: any;
  selectedMonth: any;
  selectedYear: any;

  displayingDate: any;
  daysInThisMonth: any;
  daysFromLastMonth: any;
  daysFromNextMonth: any;


  displayingDayOfMonth: any;
  displayingMonth: any;
  displayingYear: any;

  eventList: ScheduleItemType[];  // if error, might have to revert this to "any", but initial testing no problem

  private daysInMonths: number[];

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private plt: Platform,
    private cal: Calendar,
    public helper: HelpersProvider,
    public sched: ScheduleProvider,
    public ud: UserDataProvider,
    public empties: EmptiesProvider) {
    (navParams.get('date')) ? this.setSelectedDate(navParams.get('date')) : this.setSelectedDate(this.getToday());
    (navParams.get('title')) ? this.title = navParams.get('title') : this.title = 'My Schedule';
    this.buildCalendarDays(this.selectedDate);
    this.getDateEvents();
  }

  ionViewDidEnter() {
    this.getDateEvents();
  }

  deleteCancelAppt() {
    // send cancellation notice to native, if any
    // delete from calendar "schedule" member of ud
  }

  addAppt() {
    console.log('addAppt');

    var newAppt: ScheduleItemType = this.empties.getEmptyScheduleItem();
    newAppt.id = this.helper.newGuid();
    var defaultDate = new Date(this.selectedDate);
    defaultDate.setHours(11);  // default to 11  // maybe TODO set to current time, so not in past if "today"
    newAppt.start = this.helper.formatDateTime24(defaultDate);
    defaultDate.setHours(11, 59, 59);  // default 1 hour less 1 second
    newAppt.end = this.helper.formatDateTime24(defaultDate);  // initial default 1 hour
    this.ud.userData.schedule.push(newAppt);
    // this page to have 
    //    -add appt:  
    //        add (empty except defaults) event to calendar "schedule" member of ud,
    //        add appt to user.schedule,
    //        add 1 to clients.scheduledAppts,
    //    -nav to the event/visit page for details
    //          sync to native from there?
    // use calendar name from settings
    //    if absent, ask for it from list (with dialog)
    //      this.cal.listCalendars().then(data => { 
    // put these into a list for selection 
    // or allow add new? })
    // might be better to hardcode a new one
    //    once captured, put in to userdata.userinfo.calendar
    //        start/finish 
    // now go to the page to edit the event
    // this.selectEvent(newAppt);
    console.log(newAppt);
    this.navCtrl.push(AddEventPage, {
      event: newAppt,
      // mode: 'edit'    
    })
  }

  selectEvent(event: any) {
    // pick this event, go to appt details
    this.navCtrl.push(EventPage, {
      event: event,
      // mode: 'edit'    
    })
  }

  private getDateEvents() {
    // filter my schedule to just today
    let sd = new Date(this.selectedDate).setHours(0, 0, 0, 0);
    this.eventList =
      this.ud.userData.schedule
        .filter(x => (new Date(x.start).setHours(0, 0, 0, 0) === sd));
    this.eventList.forEach(item => {
      item['startTime'] = this.helper.formatTime(item['start']);
    });
  }

  goToPrevMonth() {
    this.clearSelectedDayMarker();
    this.displayingDate = new Date(this.displayingDate.getFullYear(), this.displayingDate.getMonth(), 0);
    this.buildCalendarDays(this.displayingDate);
  }

  goToNextMonth() {
    this.clearSelectedDayMarker();
    this.displayingDate = new Date(this.displayingDate.getFullYear(), this.displayingDate.getMonth() + 2, 0);
    this.buildCalendarDays(this.displayingDate);
  }

  selectDay(event: any, day: number) {
    this.setSelectedDate((this.displayingDate.getMonth() + 1) + '/' + day + '/' + this.displayingDate.getFullYear());
    this.clearSelectedDayMarker();
    this.setSelectedDayMarker(event.target);
    this.getDateEvents();
  }

  private firstOfMonthDate: Date;
  private lastOfMonthDate: Date;

  private buildCalendarDays(forDate: Date) {
    // 0-based month
    this.displayingDate = new Date(forDate);
    const thisMonth = forDate.getMonth();
    const thisYear = forDate.getFullYear();
    this.displayingMonth = monthNames[thisMonth];
    this.displayingYear = thisYear;
    var lastMonth = forDate.getMonth() - 1;
    if (lastMonth === -1) lastMonth = 11;
    var nextMonth = forDate.getMonth();
    if (nextMonth === 12) nextMonth = 0;
    // for leap years, ignores century
    this.daysInMonths = (thisMonth === 1 && ((thisYear % 4) === 0)) ? leapDaysInMonths : normalDaysInMonths;

    this.daysInThisMonth = new Array();
    for (let i = 0; i < this.daysInMonths[thisMonth]; i++) { this.daysInThisMonth.push(i + 1); }
    // days in previous month
    this.firstOfMonthDate = new Date((forDate.getMonth() + 1) + '/1/' + forDate.getFullYear());
    const firstOfMonthDoW = this.firstOfMonthDate.getDay();
    this.daysFromLastMonth = new Array();
    for (let i = 0; i < firstOfMonthDoW; i++) { this.daysFromLastMonth.push(0); }
    for (let i = 0; i < this.daysFromLastMonth.length; i++) { this.daysFromLastMonth[i] = this.daysInMonths[lastMonth] - i; }
    this.daysFromLastMonth.reverse();

    this.lastOfMonthDate = new Date((forDate.getMonth() + 1) + '/' + this.daysInMonths[forDate.getMonth()] + '/' + forDate.getFullYear());
    const lastOfMonthDoW = this.lastOfMonthDate.getDay();
    this.daysFromNextMonth = new Array();
    for (let i = 0; i < (6 - lastOfMonthDoW); i++) { this.daysFromNextMonth.push(i + 1); }
    if (this.displayingMonth === this.selectedMonth
      && this.displayingYear === this.selectedYear) {
      this.displayingDayOfMonth = this.selectedDate.getDate();
    } else {
      this.displayingDayOfMonth = 999;
    }
  }

  private setSelectedDate(d: string) {
    this.selectedDate = new Date(d);
    this.selectedMonth = monthNames[this.selectedDate.getMonth()];
    this.selectedYear = this.selectedDate.getFullYear();
    this.selectedDayOfMonth = this.selectedDate.getDate();
  }

  private setSelectedDayMarker(target: any) {
    // target is a DOM element
    // set style on the new selected day
    target.classList.remove('otherDate');
    target.classList.add('currentDate');
  }

  private clearSelectedDayMarker() {
    const source: any = document.getElementsByClassName('currentDate').item(0);
    if (!!source) {
      source.classList.remove('currentDate');
      source.classList.add('otherDate');
    }
  }

  private getToday(): string {
    const today = new Date(Date.now());
    return this.helper.formatDate(today);
  }

  getDateEventsFromNative() {
    this.eventList = new Array();
    let startDate: Date = new Date(this.selectedDate);
    startDate.setTime(0);
    let endDate: Date = new Date(this.selectedDate);
    endDate.setTime((24 * 60 * 60 * 1000) - 1);

    this.cal.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          item['startTime'] = this.helper.formatTime(item['startDate']);
          this.eventList.push(item);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

// original calendar display code from https://www.djamware.com/post/5a0bb8f780aca75eadc12d6b/build-ionic-3-angular-5-calendar-ui-with-event-integration

// this code alternate way to get events, starting with native calendar and
// finding corresponding event in userData.schedule
// goes in/replaces getDateEvents

// this.eventList = [
//   {
//     calendar: "MTA",
//     endDate: "2019-02-20 08:29:59",
//     startDate: "2019-02-20 08:00:00",
//     id: "0F9990EB-05A7-40DB-B082-424A85B59F90",
//     lastModifiedDate: "2019-02-15 09:14:02",
//     location: "",
//     message: "Massage 30",
//     title: "Alice Adams"
//   },
//   {
//     calendar: "MTA",
//     endDate: "2019-02-20 09:59:59",
//     startDate: "2019-02-20 09:00:00",
//     id: "0F9990EB-05A7-40DB-B082-424A85B59F91",
//     lastModifiedDate: "2019-02-15 09:14:02",
//     location: "",
//     message: "Massage 60",
//     title: "Bob Barker"
//   },
//   {
//     calendar: "MTA",
//     endDate: "2019-02-20 13:59:59",
//     startDate: "2019-02-20 13:00:00",
//     id: "0F9990EB-05A7-40DB-B082-424A85B59F92",
//     lastModifiedDate: "2019-02-15 09:14:02",
//     location: "",
//     message: "Massage 60",
//     title: "Cathy Cohen"
//   },
// ]

  //   // or
  //   //  filter the events to those for which i have a stored schedule[].providerItemId
  //   //    use values from there
  //   let mtaAppts = new Array();
  //   this.ud.userData.schedule.forEach(item => {
  //     mtaAppts.push(item['id']);
  //   });
  //   let el = this.eventList.filter(x => mtaAppts.indexOf(x['providerItemId']) !== -1)
  //   el.forEach(item => {
  //     item['startTime'] = helpers.formatTime(item['startDate']);
  //     var found = this.getMatchingAppt(item, this.ud.userData.schedule);
  //     item = { ...item, ...found };
  //     console.log(item);
  //     // item['clientName'] = found['clientName'];
  //     // item['serviceDescription'] = found['serviceDescription'];
  //   });
  // }

  // private getMatchingAppt(item: any, arr: any): any {
  //   var found = { clientName: 'none', serviceDescription: 'none' };
  //   arr.forEach(i => {
  //     if (item === i.providerItemId) {
  //       found = {
  //         clientName: i['clientName'],
  //         serviceDescription: i['serviceDescription']
  //       }
  //     }
  //   });
  //   return found;
  // }


  // following used the bad idea in schedule provider
    // private getDateEvents() {
  //   // filter my schedule to just today
  //   this.sched.readDates(this.selectedDate);
  //   this.eventList = this.sched.scheduleItems;
  //   this.eventList.forEach(item => {
  //     item['startTime'] = helpers.formatTime(item['start']);
  //   });
  // }