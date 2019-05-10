import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { EventPage } from '../event/event';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { HelpersProvider } from '../../providers/helpers/helpers';
// import { AddEventPage } from '../add-event/add-event';
import { EditEventPage } from '../edit-event/edit-event';
import { UserDataProvider } from '../../providers/user-data/user-data';

const normalDaysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leapDaysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  // title: any = 'Schedule';  // whose calendar is it?  title on page

  selectedDate: Date;  // determines red highlight, changed by click on date
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cal: Calendar,
    public helper: HelpersProvider,
    public ud: UserDataProvider,
    public sched: ScheduleProvider) {
    (navParams.get('date')) ? this.setSelectedDate(navParams.get('date')) : this.setSelectedDate(this.getToday());
    // (navParams.get('title')) ? this.title = navParams.get('title') : this.title = 'My Schedule';
    this.sched.read();
    this.getDateEvents();
    this.buildCalendarDays(this.selectedDate);
  }

  ionViewDidEnter() {
    this.getDateEvents();
  }

  deleteCancelAppt() {
    // send cancellation notice to native, if any
    // delete from calendar "schedule" member of ud
  }

  addAppt() {
    this.navCtrl.push(EditEventPage, {
      mode: 'add',
      date: this.selectedDate
    });
  }

  selectEvent(event: any) {
    // pick this event, go to appt details
    this.navCtrl.push(EventPage, {
      event: event,
    })
  }

  private getDateEvents() {
    // filter my schedule to just today
    this.eventList = this.sched.selectDate(this.selectedDate);
    // let sd = new Date(this.selectedDate).setHours(0, 0, 0, 0);
      // this.sched.scheduleItems   // this.ud.userData.schedule
      //   .filter(x => (new Date(x.start).setHours(0, 0, 0, 0) === sd));
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
    for (let i = 0; i < this.daysInMonths[thisMonth]; i++) { 
      // construct a corresponding date to pass to hasAppt
      const d: Date = new Date((thisMonth + 1).toString() + "/" + (i+1).toString() + "/" + thisYear.toString());
      this.daysInThisMonth.push({
        day: i + 1,
        hasAppt: this.sched.hasAppt(d) }); 
    }
    
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
    // target.classList.remove('otherDate');
    target.classList.add('currentDate');
  }

  private clearSelectedDayMarker() {
    const source: any = document.getElementsByClassName('currentDate').item(0);
    if (!!source) {
      source.classList.remove('currentDate');
      // source.classList.add('otherDate');
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


  // following used the bad idea in schedule provider
    // private getDateEvents() {
  //   // filter my schedule to just today
  //   this.sched.readDates(this.selectedDate);
  //   this.eventList = this.sched.scheduleItems;
  //   this.eventList.forEach(item => {
  //     item['startTime'] = helpers.formatTime(item['start']);
  //   });
  // }