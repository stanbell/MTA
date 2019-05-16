import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaypalPaymentPage } from './paypal-payment';

@NgModule({
  declarations: [
    PaypalPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaypalPaymentPage),
  ],
})
export class PaypalPaymentPageModule {}
