import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  mode: string;
  title: string;
  location: string;
  clientName: string;  // concat for title of appt
  startDate: Date;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    this.mode = navParams.get('mode');
    this.title = navParams.get('title');
    this.location = navParams.get('location');
    this.startDate = navParams.get('startDate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
