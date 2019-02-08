import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import { HelpersProvider } from '../helpers/helpers';
import '../../types/types';

// interface TransPartyType {
//   id: string,
//   description: string
// }

// interface TransactionsType {
//   type: string,  // revenue (my services), service charges (i paid)
//   description: string,
//   amount: number,
//   date: Date,
//   reconciled: boolean,
//   partyType: string, // client or service provider (ie, bank, cc processor)
//   party: TransPartyType,
// }

@Injectable()
export class TransactionsProvider {

// "read" and "write" to userData.transations;
  transactions: TransactionType[] = [];
  
  constructor(public ud: UserDataProvider,
              public helper: HelpersProvider) {
  }

  init() {
    this.transactions = [];
  }

  read() {
    this.transactions = this.ud.userData.transactions;
  }
  
  write() {
    this.ud.userData.transactions = this.transactions;
  }

  add(t: TransactionType) {
    this.transactions.push(t);
  }
  
  remove(i: number) {
    this.transactions.splice(i, 1);
  }

  replace(i: number, t: TransactionType) {
    this.transactions[i] = this.helper.deepCopy(t);
  }

}
