import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { StripePaymentPage } from '../stripe-payment/stripe-payment';
import { LocalStoreProvider } from '../../providers/local-store/local-store';

const PMT_RESPONSE_KEY = "MTA_P001";

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  serviceDescription: string = "";
  price: string = "0";
  tipAmount: string = "0";
  tipPercent: string = "0";
  discountAmount: string = "0";
  discountPercent: string = "0";
  totalCharge: string = "0";
  payMethod: string = "";
  event: ScheduleItemType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider,
    public plt: Platform,
    public ls: LocalStoreProvider,
    public iab: InAppBrowser) {
    this.event = this.navParams.get('event');
    this.payMethod = this.ud.userData.user.acceptPayments;
  }

  // TODO:  remember to reset event.revenue from this.price when saving/leaving

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    console.log('method ', this.payMethod);
    console.log(this.event);
    this.price = this.event.revenue.toFixed(2);
    this.calcTotal();
  }

  pay(method: string) {
    console.log('pay');
    console.log('method ', method);

    switch (method) {
      case 'stripe':
        console.log('stripe');
        this.navCtrl.push(StripePaymentPage, {
          event: this.event,
          charge: parseFloat(this.totalCharge),
          price: parseFloat(this.price),
          tipAmount: parseFloat(this.tipAmount),
          discountAmount: parseFloat(this.discountAmount),
        });
        break;
      case 'square':
        console.log('square');
        this.paySquare();
        break;
      case 'paypal':
        console.log('paypal');
        this.payPayPal();
        break;
      case 'merch':
        console.log('merch')
        this.payMerch();
        break;
      case 'cash':
      case 'check':
        console.log(method)
        this.payCash();
        break;
      default:
        break;
    }

  }

  loadstopEvent: any;
  exitEvent: any;
  paySquare() {
    this.helper.signal('paySquare');
    if (this.plt.is('cordova')) {
      alert('cordova');
      const browser = this.iab.create('../../assets/pages/sqpaymentform.html', '_blank', 'location=no');
      // const browser = this.iab.create('http://stanbell.com', '_blank', 'location=no');
      this.loadstopEvent = browser.on('loadstop').subscribe((x) => {
        alert('loaded');
        console.log('loaded');
        browser.insertCSS({ file: '../../assets/pages/sqpaymentform-basic.css' });
        // browser.executeScript({code: 'paymentForm.build();'}).then(() => alert('paymentForm BUILT'));
        browser.executeScript({ code: 'force();' }).then(() => alert('forced'));
        // browser.executeScript({code: 'alert("code");'}).then(() => alert('return'));
      });
      this.exitEvent = browser.on('exit').subscribe((x) => {
        alert('exit');
        // get the result data from localstorage
        var chargeResult = this.ls.get(PMT_RESPONSE_KEY);
        console.log(chargeResult);
        // this.event.completionState = 'Completed';
      })
    } else {
      this.helper.signal('window');
      window.open('../../assets/pages/sqpaymentform.html', '_blank')
    }
  }

  payCash() {
    console.log('payCash');
    this.composeTrans().forEach((t) => {
      this.event.transactions.push({ uniqueId: t.uniqueId })
      this.ud.userData.transactions.push(t);
    });
    this.event.pd = true;
    this.event.completionState = 'Completed';
    // TODO generate email receipt
    // save?
    this.ud.writeData();
    alert('Payment Complete');
    this.exitPage();
  }

  payPayPal() {

  }

  payMerch() {

  }

  composeTrans(): TransactionType[] {
    console.log('composeTrans');
    // re-assign price to revenue
    this.event.revenue = parseFloat(this.price);
    let d: string = new Date(Date.now()).toLocaleDateString();
    var trans: TransactionType[] = [];

    if (parseFloat(this.tipAmount) > 0) {
      trans.push({
        uniqueId: this.event.id + '_T',
        apptId: this.event.id,
        processorId: '',
        type: 'Tip',
        description: 'tip',
        amount: parseFloat(this.tipAmount),
        date: d,
        reconciled: false,
        partyType: '',
        party: { id: '', description: '' }
      });
    }
    var paymentAmt: number = parseFloat(this.price);
    if (parseFloat(this.tipAmount) > 0) {
      paymentAmt = paymentAmt + parseFloat(this.tipAmount);
    }
    if (parseFloat(this.discountAmount) > 0) {
      paymentAmt = paymentAmt - parseFloat(this.discountAmount);
    }
    paymentAmt = paymentAmt * -1;
    trans.push({
      uniqueId: this.event.id + '_P',
      apptId: this.event.id,
      processorId: '',
      type: 'Pmt',
      description: 'payment',
      amount: paymentAmt,
      date: d,
      reconciled: false,
      partyType: '',
      party: { id: '', description: '' }
    });
    if (parseFloat(this.discountAmount) > 0) {
      trans.push({
        uniqueId: this.event.id + '_D',
        apptId: this.event.id,
        processorId: '',
        type: 'Dsc',
        description: 'discount',
        amount: parseFloat(this.discountAmount) * -1,
        date: d,
        reconciled: false,
        partyType: '',
        party: { id: '', description: '' }
      });
    }
    return trans;
  }


  exitPage() {
    this.navCtrl.pop();
  }

  // ==== page helpers ====
  revenueChange() {
    this.calcTotal();
  }

  calcTotal() {
    this.totalCharge = (parseFloat(this.price) + parseFloat(this.tipAmount) - parseFloat(this.discountAmount)).toFixed(2);
  }

  tipAmountChange() {
    this.tipPercent = (parseFloat(this.tipAmount) / parseFloat(this.price) * 100).toFixed(0);
    this.calcTotal();
  }
  tipPercentChange() {
    this.tipAmount = (parseFloat(this.price) * parseFloat(this.tipPercent) / 100).toFixed(2);
    this.calcTotal();
  }
  discountAmountChange() {
    this.discountPercent = (parseFloat(this.discountAmount) / parseFloat(this.price) * 100).toFixed(0);
    this.calcTotal();
  }
  discountPercentChange() {
    this.discountAmount = (parseFloat(this.price) * parseFloat(this.discountPercent) / 100).toFixed(2);
    this.calcTotal();
  }
}
