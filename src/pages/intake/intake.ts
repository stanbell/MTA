import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import '../../types/types';
import { EmptiesProvider } from '../../providers/empties/empties';
import { UserDataWriterProvider } from '../../providers/user-data-writer/user-data-writer';

@IonicPage()
@Component({
  selector: 'page-intake',
  templateUrl: 'intake.html',
})
export class IntakePage {


  intake: IntakeType;
  client: ClientType;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public helper: HelpersProvider,
    public mt: EmptiesProvider,
    public udw: UserDataWriterProvider) {
      this.client = this.navParams.get('client');
      this.intake = this.mt.getEmptyIntake();
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad IntakePage');
      if (!!this.client.intake) {
        this.intake = this.helper.deepCopy(this.client.intake);
      } else {
        this.intake = this.mt.getEmptyIntake();
      }
    // console.log(this.intake);
  }
  
  save() {
    this.client.intake = this.helper.deepCopy(this.intake);
    // console.log('save', this.client);
    // console.log('save', this.ud.userData);
    // write the client from here?  yes  NOTE do this from each page that modifies
    this.udw.write();
    this.navCtrl.pop();
    // console.log(this.intake);
  }

  // TODO copy email, phone, to client contact info

}
