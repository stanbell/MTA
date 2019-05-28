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

  add(t: TransactionType) {
    this.transactions.push(t);
  }

}
