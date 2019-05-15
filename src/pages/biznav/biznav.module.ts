import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiznavPage } from './biznav';

@NgModule({
  declarations: [
    BiznavPage,
  ],
  imports: [
    IonicPageModule.forChild(BiznavPage),
  ],
})
export class BiznavPageModule {}
