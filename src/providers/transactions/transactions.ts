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
    this.sort();
    // filter for user's data window, and for <= today, ie no future trans shown
    var todaysDate = new Date();
    todaysDate.setHours(11,59,59, 999);
    var t: TransactionType[] = [];
    t = this.ud.userData.transactions;
    this.transactions = t.filter((f) => {
      return (new Date(f.date).valueOf() > this.ud.dataWindow.valueOf())
        && (new Date(f.date).valueOf() <= todaysDate.valueOf());
    });
  }

  sort() {
    this.ud.userData.transactions.sort((a, b) => {
      const ad = new Date(a.date).valueOf();
      const bd = new Date(b.date).valueOf();
      return ((ad > bd) as any) - ((bd > ad) as any);
    });
  }

  add(t: TransactionType) {
    this.transactions.push(t);
  }

}
