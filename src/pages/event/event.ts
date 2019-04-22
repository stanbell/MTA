import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { StripePaymentPage } from '../stripe-payment/stripe-payment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import '../../types/types';
import { LocalStoreProvider } from '../../providers/local-store/local-store';

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

// temp
  services = [ 'test 1', 'test 2', 'service 3'];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public ls: LocalStoreProvider,
    public iab: InAppBrowser,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
    // this.mode = navParams.get('mode');
    // we just edit, we've already created an empty/defaulted one if adding

    this.event = navParams.get('event');
    console.log(this.event.start);
    console.log(this.event.end);
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
    console.log('paySquare');
    if (this.plt.is('cordova')) {
      alert('cordova');
      const browser = this.iab.create('../../assets/pages/sqpaymentform.html', '_blank', 'location=no');
      // const browser = this.iab.create('http://stanbell.com', '_blank', 'location=no');
      this.loadstopEvent = browser.on('loadstop').subscribe((x) => {
        alert('loaded');
        console.log('loaded');
        browser.insertCSS({ file: '../../assets/pages/sqpaymentform-basic.css'});
        // browser.executeScript({code: 'paymentForm.build();'}).then(() => alert('paymentForm BUILT'));
        browser.executeScript({ code: 'force();' }).then(() => alert('forced'));
        // browser.executeScript({code: 'alert("code");'}).then(() => alert('return'));
      });
      this.exitEvent = browser.on('exit').subscribe((x) => {
        alert('exit');
        // get the result data from localstorage
        var chargeResult = this.ls.get(PMT_RESPONSE_KEY);
        console.log(chargeResult);
      })
    } else {
      alert('window');
      window.open('../../assets/pages/sqpaymentform.html', '_blank')
    }
  }

  save() {
    // for now, it's only the note contents

  }
// TODO unsubscribe from browser events

  // private defaultTitle: string = (!!this.ud.userData.user.defaultApptTitle) ? this.ud.userData.user.defaultApptTitle : 'Massage';
  // private defaultLocation: string =
  //   (!!this.ud.userData.user.address.label) ? this.ud.userData.user.address.label : 'Office';
  // addEvent(cal) {
  //   this.navCtrl.push(EventPage, {
  //     mode: 'add',
  //     title: this.defaultTitle, // set default in settings
  //     location: this.defaultLocation, // set in settings
  //     startDate: this.selectedDate
  //   })

  // // also sync to native calendar 
  // }

  // cancelEvent(cal) {
  // // also sync to native calendar 

  // }
}