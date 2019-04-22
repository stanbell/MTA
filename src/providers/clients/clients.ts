import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import { HelpersProvider } from '../helpers/helpers';
import '../../types/types';
import { EmptiesProvider } from '../empties/empties';

@Injectable()
export class ClientsProvider {

  // "read" and "write" to userData.clients;
  clients: ClientType[] = [];

  constructor(public ud: UserDataProvider,
    public helper: HelpersProvider,
    public mt: EmptiesProvider) {
  }

  init() {
    this.clients = [];
  }

  read() {
    this.clients = this.ud.userData.clients;
  }

  write() {
    this.ud.userData.clients = this.clients;
  }

  add(): number {
    const t: ClientType = this.mt.getEmptyClient();
    this.clients.push(t);
    return this.clients.length-1;  // last one added
  }

  remove(i: number) {
    this.clients.splice(i, 1);
  }

  replace(i: number, t: ClientType) {
    this.clients[i] = this.helper.deepCopy(t);
  }

}
