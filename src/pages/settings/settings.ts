import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  clientSchedule: boolean = false;
  listActive: string = "1m";
  sortClientsBy: string = "last";
  useCalendar: string = 'app';
  chargeCC: string = 'self';
  whoSchedule: string = 'user';
  whoIntake: string = 'user';
  defaultApptTitle: string = 'Massage';
  emailSchedule: string = '';
  autoLogOut: string = 'no';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ud: UserDataProvider) {
  }

}
