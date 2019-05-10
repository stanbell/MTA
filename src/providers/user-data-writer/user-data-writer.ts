import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';

@Injectable()
export class UserDataWriterProvider {

  constructor(public ud: UserDataProvider) {
    console.log('Hello UserDataWriterProvider Provider');
  }

  write() {
    this.ud.writeData();
  }


  updateDataWindow() {
    this.ud.dataWindow = new Date();
  }
}
