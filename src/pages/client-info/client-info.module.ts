import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientInfoPage } from './client-info';

@NgModule({
  declarations: [
    ClientInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientInfoPage),
  ],
})
export class ClientInfoPageModule {}
