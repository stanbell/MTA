import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

interface Event {
  calName: string,
  date: Date,  // time?
  dayOfMonth: number, 
  dayName: string,
  title: string
}
@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  calEvents = [];
  event: Event;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ud: UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }



}
