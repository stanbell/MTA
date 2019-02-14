import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

const normalDaysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leapDaysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", 
                                      "August", "September", "October", "November", "December"]


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  title: any = 'Schedule';  // whose calendar is it?  title on page

  selectedDate: any;  // determines red highlight, changed by click on date
  selectedMonth: any;
  selectedYear: any;

  displayingDate: any;
  daysInThisMonth: any;
  daysFromLastMonth: any;
  daysFromNextMonth: any;


  displayingDayOfMonth: any;
  displayingMonth: any;
  displayingYear: any;

  private daysInMonths: number[];

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    (navParams.get('date')) ? this.setSelectedDate(navParams.get('date')) : this.setSelectedDate(this.getToday());
    (navParams.get('title')) ? this.title = navParams.get('title') : this.title = 'My Schedule';
    this.buildCalendarDays(this.selectedDate);
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
  }

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
    const firstOfMonthDate = (forDate.getMonth() + 1) + '/1/' + forDate.getFullYear();
    const firstOfMonthDoW = new Date(firstOfMonthDate).getDay();
    this.daysFromLastMonth = new Array();
    for (let i = 0; i < firstOfMonthDoW; i++) { this.daysFromLastMonth.push(0); }
    for (let i = 0; i < this.daysFromLastMonth.length; i++) { this.daysFromLastMonth[i] = this.daysInMonths[lastMonth] - i; }
    this.daysFromLastMonth.reverse();

    const lastOfMonthDate = (forDate.getMonth() + 1) + '/' + this.daysInMonths[forDate.getMonth()] + '/' + forDate.getFullYear();
    const lastOfMonthDoW = new Date(lastOfMonthDate).getDay();
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
    return (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
  }

}

// original calendar display code from https://www.djamware.com/post/5a0bb8f780aca75eadc12d6b/build-ionic-3-angular-5-calendar-ui-with-event-integration

