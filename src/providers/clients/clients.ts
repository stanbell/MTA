import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import { EmptiesProvider } from '../empties/empties';
import '../../types/types';

@Injectable()
export class ClientsProvider {

  clients: ClientType[] = [];

  constructor(public ud: UserDataProvider,
    public mt: EmptiesProvider) {
  }

  init() {
    this.clients = [];
  }

  read() {
    this.clients = this.ud.userData.clients;
  }

  add(c: ClientType) {
    this.clients.push(c);
  }

  // remove(i: number) {
  //   this.clients.splice(i, 1);
  // }

  // replace(i: number, t: ClientType) {
  //   this.clients[i] = this.helper.deepCopy(t);
  // }

}
