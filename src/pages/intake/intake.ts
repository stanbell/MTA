import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import '../../types/types';
import { UserDataProvider } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-intake',
  templateUrl: 'intake.html',
})
export class IntakePage {

  emptyIntake: IntakeType = {
    first: "",
    last: "",
    dob: "",
    sex: "",
    occupation: "",
    email: "",
    phone: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    ecName: "",
    ecPhone: "",
    ecRelationship: "",
    physName: "",
    physPhone: "",
    cause: "",
    firstNoticed: "",
    goals: "",
    pastTreatment: "",
    dailyStress: "",
    massageBefore: "",
    massage: {
      therapeutic: false,
      relaxation: false
    },
    pressure: "",
    respiratory: {
      asthma: false,
      bronchitis: false,
      chronicCough: false,
      sob: false
    },
    cardiovascular: {
      clots: false,
      cva1: false,
      cva2: false,
      coldFeet: false,
      coldHands: false,
      chf: false,
      heartDisease: false,
      hbp: false,
      lbp: false,
      heartAttack: false,
      mi: false,
      pacemaker: false,
      phlebitis: false,
      lymphedema: false,
      trombosis: false,
      varicose: false,
      stroke: false
    },
    skin: {
      bruise: false,
      hyper: false,
      melanoma: false,
      conditions: false,
      irritations: false
    },
    headNeck: {
      ear: false,
      headache: false,
      hearing: false,
      jawPain: false,
      migraines: false,
      sinus: false,
      visionLoss: false,
      visionProb: false
    },
    infectious: {
      athletes: false,
      hepatitis: false,
      herpes: false,
      hiv: false,
      respiratory: false,
      skin: false
    },
    women: {
      gyno: false,
      pregnancy: false
    },
    softJoint: {
      ankles: {
        left: false,
        right: false
      },
      arms: {
        left: false,
        right: false
      },
      feet: {
        left: false,
        right: false
      },
      hands: {
        left: false,
        right: false
      },
      hips: {
        left: false,
        right: false
      },
      knees: {
        left: false,
        right: false
      },
      legs: {
        left: false,
        right: false
      },
      lowerBack: {
        left: false,
        right: false
      },
      midBack: {
        left: false,
        right: false
      },
      neck: {
        left: false,
        right: false
      },
      shoulders: {
        left: false,
        right: false
      },
      upperBack: {
        left: false,
        right: false
      }
    },
    famHist: {
      cardio: false,
      respiratory: false
    },
    misc: {
      allergies: false,
      anaphylaxis: false,
      joints: false,
      arthritis: false,
      crohns: false,
      diabetes: false,
      digestive: false,
      dizziness: false,
      epilepsy: false,
      gout: false,
      hemophylia: false,
      insomnia: false,
      fibromyalgia: false,
      lupus: false,
      mental: false,
      osteoarthritis: false,
      sensation: false,
      otherDiag: false,
      otherMed: false,
      rheumatoid: false,
      osteoporosis: false,
      shingles: false,
      stress: false,
      surgical: false
    },
    neuro: {
      burning: false,
      palsy: false,
      disc: false,
      ms: false,
      numbness: false,
      parkinsons: false,
      stabbing: false,
      tingling: false,
    },
    allergiesOther: "",
    meds: "",
    surgeries: "",
    skinIrritations: "",
    sick: ""
  }
  intake: IntakeType = this.emptyIntake;
  client: ClientType;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
      this.client = this.navParams.get('client');
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad IntakePage');
      if (!!this.client.intake) {
        this.intake = this.helper.deepCopy(this.client.intake);
      } else {
        this.intake = this.helper.deepCopy(this.emptyIntake);
      }
    // console.log(this.intake);
  }
  
  save() {
    this.client.intake = this.helper.deepCopy(this.intake);
    // console.log('save', this.client);
    // console.log('save', this.ud.userData);
    // write the client from here?  yes  NOTE do this from each page that modifies
    this.ud.writeData();
    this.navCtrl.pop();
    // console.log(this.intake);
  }

  // TODO copy email, phone, to client contact info

}
