import { Injectable } from '@angular/core';
import '../../types/types';

@Injectable()
export class EmptiesProvider {

  constructor() {
    console.log('Constructor EmptiesProvider Provider');
  }

  getEmptyUser(): UserInfoType {
    const mt: UserInfoType = {
      id: "",
      // pwd: "",
      businessName: "",
      address: this.getEmptyAddress(),
      contacts: [],
      // following are settings
      calendar: this.getEmptyCalendar(),
      defaultApptTitle: "",
      listActive: "",
      sortClientsBy: "",
      useCalendar: "",
      whoSchedule: "",
      whoIntake: "",
      emailSchedule: "",
      autoLogOut: "",
      acceptPayments: "",
      stripe: this.getEmptyStripe(),
      square: this.getEmptySquare(),
      paypal: this.getEmptyPaypal(),
      merch: this.getEmptyMerchant(),
      services: []
    }
    return mt;
  }

  getEmptyUserBillingInfo(): UserBillingInfoType {
    const mt = {
      ccName: "",  // holder's name
      cc: "",
      expDate: "",  // mmyy
      secCode: ""
    }
    return mt;
  }

  getEmptyNewUser(): SystemUserType {
    const mt = {
      id: "",
      pwd: "",
      businessName: "",
      billing: this.getEmptyUserBillingInfo()
    }
    return mt;
  }
  getEmptyStripe(): StripePaymentsType {
    const mt: StripePaymentsType = {
      secretKey: "",
      fee: 0
    }
    return mt;
  }
  getEmptySquare(): SquarePaymentsType {
    const mt: SquarePaymentsType = {
      applicationId: "",
      accessToken: "",
      locationId: "",
      fee: 0
    }
    return mt;
  }
  getEmptyPaypal(): PayPalPaymentsType {
    const mt: PayPalPaymentsType = {
      merchantId: "",
      publicKey: "",
      privateKey: ""
    }
    return mt;
  }
  
  getEmptyMerchant(): MerchantAcctType {
    const mt: MerchantAcctType = {
      acct: ""
    }
    return mt;
  }
  getEmptyCalendar(): CalendarType {
    const mt: CalendarType = {
      id: "",
      provider: "",
      name: "",
      connectionInfo: "",
      owner: "",
    }
    return mt;
  }
  getEmptyAddress(): AddressType {
    const mt: AddressType = {
      label: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: ""
    }
    return mt;
  }
  getEmptyContact(): ContactInfoType {
    const mt: ContactInfoType = {
      type: "",
      label: "",
      contact: "", // phn# or address
      okToText: false
    }
    return mt;
  }
  getEmptyService(): ServiceType {
    const mt: ServiceType = {
      name: "",
      duration: 0,
      price: 0
    }
    return mt;
  }

  getEmptyScheduleItem(): ScheduleItemType {
    const mt: ScheduleItemType = {
      id: "",  // of the individual event
      calendar: "",
      provider: "", // ical or google?
      providerItemId: "", // of the event
      start: "",
      end: "",
      clientName: "",
      serviceDescription: "",
      completionState: "",
      revenue: 0,
      pd: false,
      visitNote: this.getEmptyVisitNote(),
      transactions: []
    }
    return mt;
  }

  getEmptyVisitNote(): VisitNoteType {
    const mt: VisitNoteType = {
      Subjective: "",
      Objective: "",
      Assessment: "",
      Plan: ""
    };
    return mt;
  }

  getEmptyIntake(): IntakeType {
    const mt: IntakeType = {
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
    return mt;
  }

  getEmptyClient(): ClientType {
    const mt: ClientType = {
      nn: "",
      name: "Enter Client Info...",
      address: this.getEmptyAddress(),
      contacts: [],
      preferences: "",
      previousAppts: 0,
      noShowAppts: 0,
      cancelAppts: 0,
      scheduledAppts: 0,
      recurringScheduled: false,
      intake: this.getEmptyIntake()
    }
    return mt;
  }

  getEmptyUserData(): UserDataType {
    const mt: UserDataType = {
      _id: '',
      user: {
        id: '',
        // pwd: '',
        businessName: '',
        address: {
          label: '',
          street1: '',
          street2: '',
          city: '',
          state: '',
          zip: ''
        },
        contacts: [],
        calendar: {
          id: '',
          name: '',
          provider: '',
          connectionInfo: '',
          owner: '',
        },
        defaultApptTitle: '',
        listActive: "1m",
        sortClientsBy: "last",
        useCalendar: 'app',
        acceptPayments: 'self',
        whoSchedule: 'user',
        whoIntake: 'user',
        emailSchedule: '',
        autoLogOut: 'no',
        stripe: {
          secretKey: "",
          fee: 0
        },
        square: {
          applicationId: "",
          accessToken: "",
          locationId: "",
          fee: 0
        },
        paypal: {
          key: ""
        },
        merch: {
          acct: ""
        },
        services: []
      },
      appActivity: {
        lastUpdate: "01/01/1968"  // pretty old date
      },
      clients: [],
      transactions: [],
      schedule: []
    }
    return mt;
  }
}
