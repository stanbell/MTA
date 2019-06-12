import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { LookupPage } from '../lookup/lookup';
import { EmptiesProvider } from '../../providers/empties/empties';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { UserProvider } from '../../providers/user/user';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';
import '../../types/types';

const MINUTE = 1000 * 60;
const DAY = 1000 * 60 * 60 * 24;
const YEAR = 1000 * 60 * 60 * 24 * 365;

@IonicPage()
@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  startDate: any;
  endDate: any;
  minStartDate: any;
  maxEndDate: any;
  maxDuration: any = 180;
  duration: any;
  revenue: any;
  event: ScheduleItemType;
  service: ServiceType;
  selectedDate: Date;
  mode: string = 'edit';
  editPrice: boolean = false;
  editCompletionState: boolean = false;
  displayDate: string;
  timeInUse: ScheduleItemType[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public helper: HelpersProvider,
    public empties: EmptiesProvider,
    public sched: ScheduleProvider,
    public trans: TransactionsProvider,
    public user: UserProvider,
    public udw: UserDataWriterProvider,
    public ncal: Calendar) {
    this.user.read();
    this.sched.read();
    this.trans.read();
    this.mode = navParams.get('mode');
    if (this.mode === 'edit') {
      this.event = navParams.get('event');
      this.editPrice = !this.event.pd;
      console.log('end', this.event.end);
    } else {  // add
      this.editPrice = true;
      this.selectedDate = navParams.get('date');
      this.event = this.empties.getEmptyScheduleItem();
      this.event.clientName = navParams.get('clientName');
      var defaultDate = new Date(this.selectedDate);
      defaultDate.setHours(defaultDate.getHours()+1,0,0,0);  // default start on next hour
      this.event.start = this.helper.formatDateTime24(defaultDate);
      defaultDate.setHours(defaultDate.getHours()+1,0,0,0);  // default 1 hour
      this.event.end = this.helper.formatDateTime24(defaultDate);  // initial default 1 hour
      this.duration = 60;  // 1 hour
    }
    this.startDate = this.helper.convertToISO(this.event.start);
    this.endDate = this.helper.convertToISO(this.event.end);
    console.log('end', this.endDate);
    this.minStartDate = new Date(Date.now() - DAY).toISOString();
    this.maxEndDate = new Date(Date.now() + YEAR).toISOString();
    this.revenue = this.event.revenue;
    this.dateChange();
  }

  ionViewDidEnter() {
    this.helper.signal('ionViewDidEnter EditEventPage');
    const ls: LookupSelectionType = this.helper.lookupSelection;
    // this.helper.signal('lookupSelection:', ls);
    if (!!ls) {
      // returning from lookup
      switch (ls.what) {
        case 'client':
          this.event.clientName = ls.selected;
          break;
        case 'service':
          this.event.serviceDescription = ls.selected;
          this.service = this.helper.deepCopy(this.user.user.services[ls.index]);
          this.duration = this.service.duration;
          console.log(this.duration);
          if (this.duration) this.calcEndTime();
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

  dateChange() {
    const dt =  new Date(this.helper.convertFromISO(this.startDate));
    this.displayDate = (dt.getMonth() + 1) + '/' + dt.getDate();
    if (this.duration) {
      this.calcEndTime();
      this.calcDuration();
    } else {
      this.calcDuration();
      this.calcEndTime();
    }
    this.getTimeInUseForDay();
  }

  calcDuration() {
    console.log('end', this.endDate);
    this.duration = Math.round(this.helper.timeDiff(new Date(this.endDate), new Date(this.startDate)) / MINUTE);
    console.log('end', this.endDate);
  }
  calcEndTime() {
    console.log('end', this.endDate);
    console.log('duration', this.duration);
    this.duration = isNaN(this.duration) ? 0 : this.duration;
    this.endDate = this.helper.addTimeInterval(new Date(this.startDate), (this.duration * MINUTE)).toISOString();
    console.log('end', this.endDate);
    console.log('duration', this.duration);
  }

  getTimeInUseForDay() {
    var todaysDate = new Date(this.helper.convertFromISO(this.startDate));
    todaysDate.setHours(0, 0, 0, 0);
    // scan thru schedle & find appts on same day as proposed schedule
    this.timeInUse = this.sched.scheduleItems.filter((s) => {
      var sDate = new Date(s.start);
      sDate.setHours(0, 0, 0, 0);
      return sDate.valueOf() === todaysDate.valueOf();
    })
    this.timeInUse.forEach((t) => {
      t['startTime'] = this.helper.formatTime(t.start);
      t['endTime'] = this.helper.formatTime(t.end);
    })
  }


  save() {
    console.log('save', this.mode);
    if (this.mode === 'edit') {
      this.editEvent();
    } else {
      this.addEvent();
    }
    this.udw.write();
    this.navCtrl.pop();
  }

  editEvent() {
    
    this.event.start = this.helper.convertFromISO(this.startDate); // new Date(this.startDate).toISOString();
    this.event.end = this.helper.convertFromISO(this.endDate); // new Date(this.endDate).toISOString();
    console.log('start', this.event.start);
    console.log('end', this.event.end);

  }

  updateNative() { }

  formatRevenue() {
    this.event.revenue=Number(this.revenue);
  }

  addEvent() {
    // console.log('in addEvent');
    this.event.id = this.helper.newGuid();
    this.event.start = this.helper.convertFromISO(this.startDate); // new Date(this.startDate).toISOString();
    this.event.end = this.helper.convertFromISO(this.endDate); // new Date(this.endDate).toISOString();
    this.event.completionState = 'Open';  
    // create a revenue transaction, match it with the appt
    const transGuid = this.helper.newGuid();
    this.event.transactions.push({
      uniqueId: transGuid,  // use the new trans guid
    });
    this.trans.add({
      uniqueId: transGuid + '_R',
      processorId: '',
      apptId: this.event.id,
      type: 'Rev',  // revenue (my services), service charges (i paid)
      description: this.event.serviceDescription,
      amount: this.event.revenue,
      date: this.event.start,
      reconciled: false,
      partyType: 'client', // client or service provider (ie, bank, cc processor="pp")
      //TODO:  check if TransPartyType really necessary, compare to sample data
      party: { id: this.event.clientName, description: '' }
    })
    this.addToNative();
    this.sched.add(this.event);
  }

  async addToNative() {
    // console.log('cordova', this.plt.is('cordova'));
    if (this.plt.is('cordova')) {  // only works on real device
      this.helper.signal('addToNative');
      // if user is using native
      if (this.user.user.useCalendar !== 'in-app') {
        this.helper.signal('using native');
        // if we have permission
        var permitted: boolean = await this.ncal.hasReadWritePermission();
        if (!permitted) {
          permitted = await this.ncal.requestReadWritePermission();
        }
        if (permitted) {
          this.helper.signal('has permission');
          try {
            var calendarOptions: any = await this.ncal.getCalendarOptions();
            this.helper.signal('got calendarOptions');
            this.helper.signal(calendarOptions);
            calendarOptions.firstReminderMinutes = 15;
            const addr: string = this.user.user.address.street1 + ' ' +
              this.user.user.address.street2 + ' ' +
              this.user.user.address.city + ' ' +
              this.user.user.address.state;
            try {
              // TODO test with ios, this "string" type below may fail
              var eventResponse: string = await this.ncal.createEventWithOptions(
                // calendarOptions.id is the unuqie identifier?  or calendarOptions.calendar    console.log(time1);
                //                maybe only if i assign it with createEventWithOptions
                // following .findEVent & .modifyEvent are ios only
                // note when editing calendar event use calendar.findEvent(title, location, notes, startDate, endDate)
                // AND .modifyEvent(title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate)EventWithOptions(
                this.user.user.defaultApptTitle,
                addr,
                null, // notes,
                new Date(this.event.start), // startDate, 
                new Date(this.event.end), // endDate, 
                calendarOptions);
              this.helper.signal('after createEvent');
              this.helper.signal(eventResponse);  // android gives a single number
              // TOOD: validate ios also gives single number response, vs object
              // this.event.providerItemId = eventResponse['id'];  // the unique id from the native calendar
              this.event.providerItemId = eventResponse;  // the unique id from the native calendar  
              this.event.provider = (this.plt.is('ios')) ? 'apple' : 'google';
            } catch (error) {
              alert('error creating native calendar event');
            }
          } catch (error) {
            alert('failed to get calendar options');
          }
        } // else no permissions, do nothing
      }  // else not using native calendar
      this.helper.signal(this.event);
    }
  }

  setCompletionState(state: string) {
    this.event.completionState = state;
    this.editCompletionState = false;
  }

}
