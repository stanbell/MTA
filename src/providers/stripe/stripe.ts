import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CCAPI } from '../ccapi/ccapi';
import '../../types/types';

const CC_SERVER_ROUTE = 'payments';
const CRYPTO_KEY = "Twas brillig, and the slithy toves Did gyre and gimble in the wabe: All mimsy were the borogoves, And the mome raths outgrabe."

@Injectable()
export class StripeProvider {

  constructor(public api: CCAPI,
    public http: HttpClient) {
    // console.log('StripeProvider Constructor');
  }

  submit(charge: PaymentRequestType): Promise<PaymentRequestResponseType> {
    // console.log('stripe provider submit');
    return new Promise((resolve, reject) => {

      if (this.checkCCDataValid(charge.client,
        charge.card.number,
        charge.card.expMonth,
        charge.card.expYear)) {

        // TODO:  package and encrypt before send
        // console.log('charge', charge);
        try {
          // console.log('writing ' + CC_SERVER_ROUTE);
          let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + charge.methodData['secretKey']  // stripe specific==========
          });
          this.api.putData(CC_SERVER_ROUTE, httpHeaders, charge)
            .then((returnedCharge: PaymentRequestResponseType) => {
              // console.log('returned ', returnedCharge);
              if (returnedCharge.paid) {
                // console.log('Payment request completed');
                resolve(returnedCharge);
              } else {  // paid = false, expect a failure code  //TEST
                // console.log('transaction failed with stripe failure code ' + returnedCharge.failure_code + ' ' + returnedCharge.failure_message);
                reject('transaction failed with stripe failure code ' + returnedCharge.failure_code + ' ' + returnedCharge.failure_message);
              }
            });
        }
        catch (err) {
          // card charge problem, or
          // api http etc problem
          console.log('ccapi.putData error', err);
        }
      } else {
        reject('invalid something');
      }
    });

  }


  checkCCDataValid(ccName: string,
    ccNumber: string,
    ccExpireMM: string,
    ccExpireYY: string): boolean {

    var valid: boolean = true;
    if (ccName.length < 1) {
      valid = false;
    }
    if (ccNumber.length !== 16) {
      valid = false;
    }
    if (parseInt(ccExpireMM) < 1 || parseInt(ccExpireMM) > 12) {
      valid = false;
    }
    let yy = parseInt(ccExpireYY) > 2000 ? parseInt(ccExpireYY) - 2000 : ccExpireYY;
    if (yy < 19 || yy > 30) {
      valid = false;
    }
    // console.log('valid', valid);
    return valid;
  }


}
