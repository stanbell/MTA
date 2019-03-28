import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntakePage } from './intake';

@NgModule({
  declarations: [
    IntakePage,
  ],
  imports: [
    IonicPageModule.forChild(IntakePage),
  ],
})
export class IntakePageModule {}
