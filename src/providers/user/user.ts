import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import { EmptiesProvider } from '../empties/empties';
import '../../types/types';

@Injectable()
export class UserProvider {

  user: UserInfoType;

  constructor(public ud: UserDataProvider,
    public empties: EmptiesProvider) {
  }

  init() {
    this.user = this.empties.getEmptyUser();
  }

  read() {
    this.user = this.ud.userData.user;
  }

}
