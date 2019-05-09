import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { StripePaymentPage } from '../stripe-payment/stripe-payment';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import '../../types/types';
import { LocalStoreProvider } from '../../providers/local-store/local-store';
import { EditEventPage } from '../edit-event/edit-event';

const PMT_RESPONSE_KEY = "MTA_P001";

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


  // stupid angular won't refresh non-input data
  // so use this for fields edited in edit-event form
  display: string[] = ['','','','',''];

  // temp
  services = ['test 1', 'test 2', 'service 3'];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public ls: LocalStoreProvider,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
    // this.mode = navParams.get('mode');
    // we just edit, we've already created an empty/defaulted one if adding

    this.event = navParams.get('event');
    console.log(this.event);
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
    this.display[4] = this.event.completionState;
  }

  pay() {
    console.log('pay');

    switch (this.ud.userData.user.acceptPayments) {
      case 'stripe':
        this.navCtrl.push(StripePaymentPage, {
          event: this.event
        });
        break;
      case 'square':
        this.paySquare();
        break;
      case 'paypal':
        break;
      case 'self':
        // just let them key in amount paid?
        break;
      default:
        break;
    }

  }

  private matchTransactions(trans: any[], source: any[]): any[] {
    var t: string[] = new Array();
    trans.forEach(i => t.push(i.uniqueId));
    return source.filter(x => t.indexOf(x.uniqueId) !== -1);
    // var filteredTrans = source.filter(x => t.indexOf(x.uniqueId) !== -1);
    // return filteredTrans;
  }

  loadstopEvent: any;
  exitEvent: any;

  paySquare() {
    this.helper.signal('paySquare');
    // if (this.plt.is('cordova')) {
    //   alert('cordova');
    //   const browser = this.iab.create('../../assets/pages/sqpaymentform.html', '_blank', 'location=no');
    //   // const browser = this.iab.create('http://stanbell.com', '_blank', 'location=no');
    //   this.loadstopEvent = browser.on('loadstop').subscribe((x) => {
    //     alert('loaded');
    //     console.log('loaded');
    //     browser.insertCSS({ file: '../../assets/pages/sqpaymentform-basic.css'});
    //     // browser.executeScript({code: 'paymentForm.build();'}).then(() => alert('paymentForm BUILT'));
    //     browser.executeScript({ code: 'force();' }).then(() => alert('forced'));
    //     // browser.executeScript({code: 'alert("code");'}).then(() => alert('return'));
    //   });
    //   this.exitEvent = browser.on('exit').subscribe((x) => {
    //     alert('exit');
    //     // get the result data from localstorage
    //     var chargeResult = this.ls.get(PMT_RESPONSE_KEY);
    //     console.log(chargeResult);
    //   })
    // } else {
      this.helper.signal('window');
      window.open('../../assets/pages/sqpaymentform.html', '_blank')
    // }
  }

  editEvent() {
    this.navCtrl.push(EditEventPage, {
      mode: 'edit',
      event: this.event
    });
  }

  save() {
    // for now, it's only the note contents

  }

}