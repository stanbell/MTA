import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';

@Injectable()
export class UserDataWriterProvider {

  constructor(public ud: UserDataProvider) {
    console.log('Constructor UserDataWriterProvider Provider');
  }

  write() {
    this.ud.writeData();
  }


  updateDataWindow() {
    this.ud.dataWindow = new Date();
    console.log('new dataWindow', this.ud.dataWindow);
  }
}
