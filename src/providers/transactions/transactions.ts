import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import '../../types/types';

@Injectable()
export class TransactionsProvider {

  transactions: TransactionType[] = [];

  constructor(public ud: UserDataProvider) {

  }

  init() {
    this.transactions = [];
  }

  read() {
    var t: TransactionType[] = [];
    t = this.ud.userData.transactions;
    this.transactions = t.filter((f) => {
      return (new Date(f.date).valueOf() > this.ud.dataWindow.valueOf());
    });
  }

  // this is a reference, not a copy, so this "write" redundant
  // write() {
  //   this.ud.userData.transactions = this.transactions;
  // }

  add(t: TransactionType) {
    this.transactions.push(t);
  }

  // remove(i: number) {
  //   this.transactions.splice(i, 1);
  // }

  // replace(i: number, t: TransactionType) {
  //   this.transactions[i] = this.helper.deepCopy(t);
  // }

}
