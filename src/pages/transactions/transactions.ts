import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UserDataProvider } from '../../providers/user-data/user-data';

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
    public trans: TransactionsProvider,
    public ud: UserDataProvider) {
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
      this.itemsList[i]['clientName'] = this.findClientName(this.itemsList[i].apptId);
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

  findClientName(apptId: string): string {
    var result: ScheduleItemType[] = this.ud.userData.schedule.filter(obj => {
      return obj.id === apptId
    })
    return result[0].clientName;
  }

}
