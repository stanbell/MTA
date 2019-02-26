import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe/ngx';
import '../../types/types';
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  event: ScheduleItemType;
  ccName: string = '';
  ccNumber: string = '';
  ccExpireMM: number = 1;
  ccExpireYY: number = 22;
  ccCVC: number = 1;
  ccDataValid: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private stripe: Stripe) {
    this.event = this.navParams.get('event');
    // set form default
    this.ccName = this.event.clientName;
    // TODO maybe address too
    this.stripe.setPublishableKey('pk_test_vAidVUliiJPHRom0ugMStYn6')
    .then()
    .catch((reason) => console.log(reason));
  }

  verify() {
    this.checkCCDataValid();
  }

  submit() {
    // go to our pmt processing api?
    console.log('submit');

    let card = {
      number: this.ccNumber,
      expMonth: this.ccExpireMM,
      expYear: 2000 + this.ccExpireYY,
      cvc: this.ccCVC.toString()
    }
    // let card = {
    //   number: '4242424242424242',
    //   expMonth: 12,
    //   expYear: 2020,
    //   cvc: '220'
    // }

    this.stripe.createCardToken(card)
      .then(token => {
        console.log(token.id);
        alert('token ' + token.id);
      })
      .catch(error => {
        console.error(error)
        alert('token error ' + error);
      });

    // send the token to mta cc api

  }

  cancel() {
    this.navCtrl.pop();
  }


  async checkCCDataValid() {
    this.ccDataValid = true;
    if (this.ccName.length < 1) {
      this.ccDataValid = false;
    }
    if (this.ccNumber.length !== 16) {
      this.ccDataValid = false;
    }
    if (this.ccExpireMM < 1 || this.ccExpireMM > 12) {
      this.ccDataValid = false;
    }
    if (this.ccExpireYY < 19 || this.ccExpireYY > 30) {
      this.ccDataValid = false;
    }
    if (this.ccDataValid) {
      this.ccDataValid = await this.checkValidators();
    }
    console.log(this.ccDataValid);
  }

  async checkValidators() {
    // run whatever api validator
    var valid: boolean = false;
    valid = await this.checkNumber();
    alert('checkNumber' + valid);
    valid = await this.checkExpiry();
    alert('checkExpiry' + valid);
    valid = await this.checkCVC();
    alert('checkCVC' + valid);
    return valid;
  }
  async checkNumber() {
    var valid: boolean = false;
    try {
      valid = await this.stripe.validateCardNumber(this.ccNumber);
    }
    catch { valid = false; }
    return valid;
  }
  async checkExpiry() {
    var valid: boolean = false;
    try {
      valid = await this.stripe.validateExpiryDate(this.ccExpireMM.toString(), (2000 + this.ccExpireYY).toString());
    }
    catch { valid = false; }
    return valid;
  }
  async checkCVC() {
    var valid: boolean = false;
    try {
      valid = await this.stripe.validateCVC(this.ccCVC.toString());
    }
    catch { valid = false; }
    return valid;
  }
}
