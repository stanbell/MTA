import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  itemsList: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
  }

}
