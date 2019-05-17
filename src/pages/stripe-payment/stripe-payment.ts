import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { CCAPI } from '../../providers/ccapi/ccapi';
import { HelpersProvider } from '../../providers/helpers/helpers';
import '../../types/types';

const CC_SERVER_ROUTE = 'payments';
const CRYPTO_KEY = "Twas brillig, and the slithy toves Did gyre and gimble in the wabe: All mimsy were the borogoves, And the mome raths outgrabe."

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'stripe-payment.html',
})
export class StripePaymentPage {


  event: ScheduleItemType;
  ccName: string = '';
  ccNumber: string = '4242424242424242';
  ccExpireMM: number = 2;
  ccExpireYY: number = 22;
  ccCVC: number = 889;
  ccDataValid: boolean = false;
  totalCharge: number = 0;
  displayCharge: string = "";

  price: string = "0";
  tipAmount: string = "0";
  discountAmount: string = "0";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helpers: HelpersProvider,
    private api: CCAPI,
    public ud: UserDataProvider) {
    this.event = this.navParams.get('event');
    this.price = this.navParams.get('price');
    this.tipAmount = this.navParams.get('tipAmount');
    this.discountAmount = this.navParams.get('discountAmount');
    this.totalCharge = this.navParams.get('charge');
    this.displayCharge = this.totalCharge.toFixed(2);
    // set form default
    this.ccName = this.event.clientName;
    // TODO add address later to reduce liability on card charge
  }

  verify() {
    this.ccDataValid = this.checkCCDataValid();
  }

  submit() {
    this.ccDataValid = this.checkCCDataValid();
    if (this.ccDataValid) {
      // go to our pmt processing api?
      console.log('submit');

      console.log('methodData', this.ud.userData.user[this.ud.userData.user.acceptPayments]);

      let charge: PaymentRequestType = {
        accountId: this.ud.userData._id,
        client: this.event.clientName,
        service: this.event.serviceDescription,
        statementDescription: this.ud.userData.user.businessName + ' ' + this.event.serviceDescription,
        transId: this.helpers.newGuid(),
        method: this.ud.userData.user.acceptPayments,
        methodData: this.ud.userData.user[this.ud.userData.user.acceptPayments],
        amount: this.totalCharge,
        card: {
          number: this.ccNumber,
          expMonth: this.ccExpireMM.toString(),
          expYear: (2000 + this.ccExpireYY).toString(),
          cvc: this.ccCVC.toString()
        },
        cardNonce: ''  // not used with stripe
      }
      // TODO:  package and encrypt before send
      console.log('charge', charge);
      try {
        console.log('writing ' + CC_SERVER_ROUTE);
        let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' + charge.methodData['secretKey']  // stripe specific==========
        });
        this.api.putData(CC_SERVER_ROUTE, httpHeaders, charge)
          .then((returnedCharge: PaymentRequestResponseType) => {
            console.log('returned ', returnedCharge);
            if (returnedCharge.paid) {
              // if paid, compute the transactions
              let trans = this.composeTrans(returnedCharge, charge.methodData['fee']);
              console.log(trans);
              trans.forEach((t) => {
                // add the transactions to the client, and...
                this.ud.userData.transactions.push(t);
                // ...add the transactions' unique id to the appt
                this.event.transactions.push({ uniqueId: t.uniqueId });
              });
              this.event.pd = true;
              this.event.completionState = 'Completed';
              this.ud.writeData();
              alert('Payment request completed');
            } else {  // paid = false, expect a failure code  //TEST
              alert('transaction failed with stripe failure code ' + returnedCharge.failure_code + ' ' + returnedCharge.failure_message);
            }
            this.navCtrl.removeView(this.navCtrl.getPrevious())
              .then(() => {
                this.navCtrl.pop(); // go back to event page
              });
          });
      }
      catch (err) {
        // card charge problem, or
        // api http etc problem
        console.log('writeLocal mtaapi.putData error', err);
      }
    }

  }


  // TODO:  fix this to match cash/other payments in payments.ts

  composeTrans(charge: PaymentRequestResponseType, fee: number): TransactionType[] {
    console.log('stripe composeTrans');
    let d = new Date(charge.created * 1000).toLocaleDateString();
    var trans: TransactionType[] = [];

    // don't change the revenue trans    
    // const revTrans = {  // note the rev trans initially created in edit-event.ts, but overwritten here
    //   uniqueId: charge.id + '_R',
    //   processorId: charge.id,
    //   apptId: this.event.id,
    //   type: 'Rev',
    //   description: charge.description,
    //   amount: charge.amount,
    //   date: d,
    //   reconciled: false,
    //   partyType: "client",
    //   party: {
    //     id: '',
    //     description: ''
    //   }
    // };
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
    // var paymentAmt: number = parseFloat(this.price);
    // if (parseFloat(this.tipAmount) > 0) {
    //   paymentAmt = paymentAmt + parseFloat(this.tipAmount);
    // }
    // if (parseFloat(this.discountAmount) > 0) {
    //   paymentAmt = paymentAmt - parseFloat(this.discountAmount);
    // }
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
    // fee
    let feeAmount: number = 0 - (charge.amount * fee);
    trans.push({
      uniqueId: this.event.id + '_F',
      apptId: this.event.id,
      processorId: charge.id,
      type: 'Fee',
      description: this.ud.userData.user.acceptPayments + ' fee',
      amount: feeAmount,
      date: d,
      reconciled: false,
      partyType: "stripe",
      party: {
        id: 'fee',
        description: ''
      }
    });
    // const feeTrans = {
    //   uniqueId: charge.id + '_F',
    //   processorId: charge.id,      
    //   apptId: this.event.id,
    //   type: 'Fee',
    //   description: this.ud.userData.user.acceptPayments + ' fee',
    //   amount: feeAmount,
    //   date: d,
    //   reconciled: false,
    //   partyType: "stripe",
    //   party: {
    //     id: 'fee',
    //     description: ''
    //   }
    // };
    // payment remainder (charge less fee)
    // charge.amount should match this.totalCharge
    let chgRemainder: number = 0 - (charge.amount + feeAmount);
    trans.push({
      uniqueId: charge.id + '_P',
      processorId: charge.id,
      apptId: this.event.id,
      type: 'CC',
      // description: 'net credit',
      description: this.ud.userData.user.acceptPayments + ' payment', //  + charge.id,
      amount: chgRemainder,
      date: d,
      reconciled: false,
      partyType: "CC",
      party: {
        id: 'CC',
        description: charge.processorId
      }
    });
    return trans;
  }
  cancel() {
    this.navCtrl.pop();
  }

  checkCCDataValid(): boolean {
    var valid: boolean = true;
    if (this.ccName.length < 1) {
      valid = false;
    }
    if (this.ccNumber.length !== 16) {
      valid = false;
    }
    if (this.ccExpireMM < 1 || this.ccExpireMM > 12) {
      valid = false;
    }
    if (this.ccExpireYY < 19 || this.ccExpireYY > 30) {
      valid = false;
    }
    console.log(valid);
    return valid;
  }

}


    // let card = {
    //   number: '4242424242424242',
    //   expMonth: 12,
    //   expYear: 2020,
    //   cvc: '220'
    // }