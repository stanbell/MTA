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
  mainTransPage: boolean = true;
  filter: ClientType;
  itemsList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public trans: TransactionsProvider,
    public ud: UserDataProvider) {
    this.filter = navParams.get('client');
    this.mainTransPage = (!!this.filter) ? false : true; 
    trans.read();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    // console.log('trans', this.trans.transactions);
    // console.log((this.filter) ? this.filter.name : 'no filter');
    (this.filter) ? this.populateItems(this.filter.name) : this.populateItems();
    // console.log(this.itemsList);
    
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave TransactionsPage');
    // this.saveItems()  ???
    this.trans.write();
  }

  choose(item: any) {

  }

  populateItems(filter?: string) {

    this.itemsList = [];
    let ttl: number = 0;

    for (let i = 0; i < this.trans.transactions.length; i++) {
      const cName = this.findClientName(this.trans.transactions[i].apptId);
      if (filter) {  // if filtering
        if (cName !== filter) {  // skip if doesn't match
          continue;
        }
      }
      this.itemsList.push(this.trans.transactions[i]);
      const j = this.itemsList.length - 1;  // last one added
      this.itemsList[j]['clientName'] = cName;
      let d = new Date(this.itemsList[j].date);
      let y = d.getFullYear().toString();
      y = y.substr(2, 2);
      this.itemsList[j]['shortDate'] = (d.getMonth() + 1) + '/' + y;
      this.itemsList[j]['formattedAmount'] = (this.itemsList[j].amount >= 0)
        ? this.itemsList[j].amount.toFixed(2)
        : "(" + (0 - this.itemsList[j].amount).toFixed(2) + ")";
      this.itemsList[j]['reconciledIcon'] = (this.itemsList[j].reconciled)
        ? 'checkmark-circle'
        : 'remove-circle-outline';
      if (this.itemsList[j].amount > 0) ttl += this.itemsList[j].amount;
    }
    this.itemsList.push({ shortDate: '', description: 'Total', formattedAmount: ttl.toFixed(2), reconciledIcon: 'none' })
  }

  findClientName(apptId: string): string {
    var result: ScheduleItemType[] = this.ud.userData.schedule.filter(obj => {
      return obj.id === apptId
    })
    return result[0].clientName;
  }

}
