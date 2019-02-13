import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  itemsList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public trans: TransactionsProvider) {
    trans.read();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    console.log('trans', this.trans.transactions);
    this.populateItems();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave TransactionsPage');
    // this.saveItems()  ???
    this.trans.write();
  }

  choose(item: any) {

  }

  populateItems() {
    this.itemsList = [];
    let ttl: number = 0;
    for (let i = 0; i<this.trans.transactions.length; i++) {
      this.itemsList.push(this.trans.transactions[i]);
      let d = new Date(this.itemsList[i].date);
      let y = d.getFullYear().toString();
      y = y.substr(2, 2);
      this.itemsList[i]['shortDate'] = (d.getMonth() + 1) + '/' + y;
      this.itemsList[i]['formattedAmount'] = (this.itemsList[i].amount >= 0) 
        ? this.itemsList[i].amount.toFixed(2) 
        : "(" + (0 - this.itemsList[i].amount).toFixed(2) + ")";
      this.itemsList[i]['reconciledIcon'] = (this.itemsList[i].reconciled) 
        ? 'checkmark-circle' 
        : 'remove-circle-outline';
      if (this.itemsList[i].amount > 0) ttl += this.itemsList[i].amount;
    }
    this.itemsList.push({shortDate:'', description: 'Total', formattedAmount: ttl.toFixed(2), reconciledIcon: 'none'})
  }
}
