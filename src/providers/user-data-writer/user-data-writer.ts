import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
// import '../../types/types';

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
  }

  signup(nu: NewUserType) {
    this.ud.createUser(nu);
  }

}
