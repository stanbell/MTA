import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { LookupPage } from '../lookup/lookup';
import '../../types/types';

const MINUTE = 1000 * 60;
const DAY = 1000 * 60 * 60 * 24;
const YEAR = 1000 * 60 * 60 * 24 * 365;

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  startDate: any;
  endDate: any;
  minStartDate: any;
  maxEndDate: any;
  maxDuration: any = 180;
  duration: any;
  event: ScheduleItemType;
  service: ServiceTypes;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public helper: HelpersProvider,
    public ud: UserDataProvider,
    public ncal: Calendar) {
    this.event = navParams.get('event');
    this.startDate = new Date(this.event.start).toISOString();
    this.endDate = new Date(this.event.end).toISOString();
    this.minStartDate = new Date(Date.now() - DAY).toISOString();
    this.maxEndDate = new Date(Date.now() + YEAR).toISOString();
    this.calcDuration();
  }

  ionViewDidLoad() {
    this.helper.signal('ionViewDidLoad AddEventPage');
  }

  ionViewDidEnter() {
    this.helper.signal('ionViewDidEnter AddEventPage');
    const ls: LookupSelectionType = this.helper.lookupSelection;
    this.helper.signal('lookupSelection:', ls);
    if (!!ls) {
      // returning from lookup
      switch (ls.what) {
        case 'client':
          this.event.clientName = ls.selected;
          break;
        case 'service':
          this.event.serviceDescription = ls.selected;
          // TODO also assign to this.service
          this.service = this.helper.deepCopy(this.ud.userData.user.services[ls.index]);
          this.duration = this.service.duration;
          this.calcEndTime();
          break;
        default:
          break;
      }
    }
  }

  lookup(what: string): void {
    this.navCtrl.push(LookupPage,
      {
        type: what,
        searchTerm: this.helper.upshiftInitial(what)
      });
  }

  calcDuration() {
    this.duration = Math.round(this.helper.timeDiff(new Date(this.endDate), new Date(this.startDate)) / MINUTE);
  }
  calcEndTime() {
    this.duration = isNaN(this.duration) ? 0 : this.duration;
    this.endDate = this.helper.addTimeInterval(new Date(this.startDate), (this.duration * MINUTE)).toISOString();
  }

  // TODO:  time not saving correctly

  addEvent() {
    this.helper.signal('addEvent');
    this.helper.signal(this.event);
    this.event.start = this.helper.formatDateTime24(this.startDate); // new Date(this.startDate).toISOString();
    this.event.end = this.helper.formatDateTime24(this.endDate); // new Date(this.endDate).toISOString();
    this.event.revenue = this.service.price;
    // create a revenue transaction, match it with the appt
    const transGuid = this.helper.newGuid();
    this.event.transactions.push({
      uniqueId: transGuid,  // use the new trans guid
    });
    console.log(this.service.price);
    this.ud.userData.transactions.push({
      uniqueId: transGuid + '_R',
      processorId: '',
      apptId: this.event.id,
      type: 'revenue',  // revenue (my services), service charges (i paid)
      description: this.event.serviceDescription,
      amount: this.event.revenue,
      date: this.event.start,
      reconciled: false,
      partyType: 'client', // client or service provider (ie, bank, cc processor="pp")
      //TODO:  check if TransPartyType really necessary, compare to sample data
      party: { id: this.event.clientName, description: '' }
    })
    this.addToNative();
    // this event already added before we came in here
    // this.ud.userData.schedule.push(this.event);
    // TODO verify want to save here?
    this.ud.writeData();
    // go back
    this.navCtrl.pop();
  }

  async addToNative() {
    console.log('cordova', this.plt.is('cordova'));
    if (this.plt.is('cordova')) {  // only works on real device
      this.helper.signal('addToNative');
      // if user is using native
      if (this.ud.userData.user.useCalendar === 'in-app') return; {
        this.helper.signal('using native');
        // if we have permission
        if (!this.ncal.hasReadWritePermission()) {
          await this.ncal.requestReadWritePermission()
        }
        if (this.ncal.hasReadWritePermission()) {
          this.helper.signal('has permission');
          var calendarOptions: any = await this.ncal.getCalendarOptions();
          this.helper.signal('got calendarOptions');
          this.helper.signal(calendarOptions);
          calendarOptions.firstReminderMinutes = 15;
          var eventResponse: any = await this.ncal.createEventWithOptions(
            this.ud.userData.user.defaultApptTitle,
            null, // location, 
            null, // notes,
            new Date(this.event.start), // startDate, 
            new Date(this.event.end), // endDate, 
            calendarOptions);
          this.helper.signal('after createEvent');
          this.helper.signal(eventResponse);
          this.event.providerItemId = eventResponse['id'];  // the unique id from the native calendar
          this.event.provider = (this.plt.is('ios')) ? 'apple' : 'google';
        } // else no permissions, do nothing
      }  // else not using native calendar
      this.helper.signal(this.event);
    }
  }

}


// calendarOptions.id is the unuqie identifier?  or calendarOptions.calendarI    console.log(time1);
  //                maybe only if i assign it with createEventWithOptions
  // following .findEVent & .modifyEvent are ios only
  // note when editing calendar event use calendar.findEvent(title, location, notes, startDate, endDate)
  // AND .modifyEvent(title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate)