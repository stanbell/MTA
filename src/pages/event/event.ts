import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { EditEventPage } from '../edit-event/edit-event';
import { PaymentPage } from '../payment/payment';
import '../../types/types';


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
  editingNoteNow: boolean = false;
  editCompletionState: boolean = false;


  // stupid angular won't refresh non-input data
  // so use this for fields edited in edit-event form
  display: string[] = ['', '', '', '', ''];

  services: string[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {

    this.event = navParams.get('event');
    // console.log(this.event);
    this.displayDate = (new Date(this.event.start).toLocaleDateString());
    this.displayStart = (new Date(this.event.start).toLocaleTimeString());
    this.displayEnd = (new Date(this.event.end).toLocaleTimeString());

    this.eventDate = new Date(this.event.start);
    // TODO:  restrict edits for past events?
    this.future = (this.eventDate.valueOf() > Date.now());  // future, can edit
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter EventPage');
    this.initialTransactions = this.matchTransactions(this.event.transactions, this.ud.userData.transactions);
    this.initialTransactions.forEach(e => e.type = this.helper.upshiftInitial(e.type));
    this.transactions = this.helper.deepCopy(this.initialTransactions);
    this.transactions.forEach((e) => {
      e['formattedAmount'] = (e.amount >= 0) ? e.amount.toFixed(2) : "(" + (0 - e.amount).toFixed(2) + ")";
    });
    this.display[0] = this.displayDate;
    this.display[1] = this.displayStart + ' to ' + this.displayEnd;
    this.display[2] = 'Client: ' + this.event.clientName;
    this.display[3] = 'Service: ' + this.event.serviceDescription;
    this.event.completionState = (!!this.event.completionState) ? this.event.completionState : 'Open';
    // this.display[4] = this.event.completionState;
  }

  pay() {
    this.navCtrl.push(PaymentPage,
      {
        event: this.event,
      });
  }

  private matchTransactions(trans: any[], source: any[]): any[] {
    var t: string[] = new Array();
    trans.forEach(i => t.push(i.uniqueId));
    return source.filter(x => t.indexOf(x.uniqueId) !== -1);
    // var filteredTrans = source.filter(x => t.indexOf(x.uniqueId) !== -1);
    // return filteredTrans;
  }



  editEvent() {
    this.navCtrl.push(EditEventPage, {
      mode: 'edit',
      event: this.event
    });
  }

  save() {
    // for now, it's only the note contents
    this.ud.writeData();
  }


  setCompletionState(state: string) {
    this.event.completionState = state;
    this.editCompletionState = false;
    this.save();
  }

}