import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
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
    this.getList(this.type);
  }

  getList(type: string) {
    // TODO:  filter to searchTerm

    this.itemsList = [];
    switch (type) {
      case 'client':
        this.ud.userData.clients.forEach(e => {
          this.itemsList.push({ text: e.name });
        });
        break;
      case 'service':
        this.ud.userData.user.services.forEach(e => {
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

}
