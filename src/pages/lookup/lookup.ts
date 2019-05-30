import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';

@IonicPage()
@Component({
  selector: 'page-lookup',
  templateUrl: 'lookup.html',
})
export class LookupPage {

  type: string; // may be clients or services
  searchTerm: string;
  searchName: string;
  planName: string;
  itemsList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
    this.type = this.navParams.get('type');
    this.searchName = this.navParams.get('searchName');
  }

  ionViewDidEnter() {
    this.getList();
  }

  getList() {
    this.itemsList = [];
    var tempList: any = [];
    switch (this.type) {
      case 'client':
        tempList = (!!this.searchTerm)
          ? tempList = this.ud.userData.clients
            .filter(x => x.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
          : tempList = this.ud.userData.clients;
          console.log(tempList);
        tempList.forEach(e => {
          this.itemsList.push({ text: e.name });
        });
        break;
      case 'service':
        tempList = (!!this.searchTerm)
          ? tempList = this.ud.userData.user.services
            .filter(x => x.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
          : tempList = this.ud.userData.user.services;
        tempList.forEach(e => {
          this.itemsList.push({ text: e.name });
        });
        break;
      default:
        break;
    }
  }

  choose(which: string, i: number) {
    this.helper.lookupSelection = { what: this.type, selected: which, index: i };
    this.navCtrl.pop();
  }

  // populateItems() {
  //   // this.itemsList = [];
  //   this.itemsList = (!!this.searchTerm)
  //     ? this.itemsList = this.clients.clients
  //       .filter(x => x.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
  //     : this.itemsList = this.clients.clients;
  // }


}
