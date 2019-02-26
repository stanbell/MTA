import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApptInfoPage } from './appt-info';

@NgModule({
  declarations: [
    ApptInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ApptInfoPage),
  ],
})
export class ApptInfoPageModule {}
