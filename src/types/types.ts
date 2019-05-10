interface LookupSelectionType {
    what: string,
    selected: any,
    index: number
}

interface AddressType {
    label: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string
}

interface ContactInfoType {
    type: string, // phone, email
    label: string,
    contact: string, // phn# or address
    okToText: boolean
}

interface StripePaymentsType {
    secretKey: string,
    fee: number
}
interface SquarePaymentsType {
    applicationId: string,
    accessToken: string,
    locationId: string,
    fee: number
}
interface PayPalPaymentsType {
    key: string
}
interface MerchantAcctType {
    acct: string
}

interface ServiceType {
    name: string,
    duration: number, // in minutes
    price: number
}

interface UserInfoType {
    id: string,
    pwd: string,
    businessName: string,
    address: AddressType,
    contacts: ContactInfoType[],
    // following are settings
    calendar: CalendarType,
    defaultApptTitle: string,
    listActive: string,
    sortClientsBy: string,
    useCalendar: string,
    whoSchedule: string,
    whoIntake: string,
    emailSchedule: string,
    autoLogOut: string,
    acceptPayments: string,
    stripe: StripePaymentsType,
    square: SquarePaymentsType,
    paypal: PayPalPaymentsType,
    merch: MerchantAcctType
    services: ServiceType[]
}

interface CalendarType {
    id: string, //maybe
    name: string,  // the calendarName used to create, into which appts will go
    provider: string, // ical or google
    connectionInfo: string, // TODO change when i learn what this needs to be
    owner: string, // userid or whatever for that native calendar
}

interface TransPartyType {
    id: string,  // client or service provider
    description: string,
    // sum of $$ over time?  no, save that for reporting
}

interface CCardType {
    number: string,
    expMonth: string,
    expYear: string,
    cvc: string
}

interface PaymentRequestType {
    accountId: string,
    client: string,
    service: string,
    statementDescription: string,
    transId: string,
    method: string,
    methodData: {},
    amount: number,
    card: CCardType,
    cardNonce: string
}

interface PaymentRequestResponseType {
    id: string,
    processorId: string,
    amount: number,
    created: number,
    currency: string,
    description: string,
    failure_code: string,
    failure_message: string,
    paid: boolean,
    // statement_descriptor: string,
    status: string
}

interface TransactionType {
    uniqueId: string,  // my generated id
    apptId: string,
    processorId: string,  // comes from the payment processor for pmt trans
    type: string,  // revenue (my services), service charges (i paid)
    description: string,
    amount: number,
    date: string,
    reconciled: boolean,
    partyType: string, // client or service provider (ie, bank, cc processor="pp")
    party: TransPartyType,
}

interface ClientType {
    nn: string,
    name: string,
    address: AddressType,
    contacts: ContactInfoType[],
    preferences: string,
    previousAppts: number,
    noShowAppts: number,
    cancelAppts: number,
    scheduledAppts: number,
    recurringScheduled: boolean,
    intake: IntakeType
}

interface VisitNoteType {
    Subjective: string,
    Objective: string,
    Assessment: string,
    Plan: string
}
interface ScheduleItemType {  // =='event' in much of the code
    id: string,  // of the individual event
    calendar: string,
    provider: string, // ical or google?
    providerItemId: string, // of the event
    start: string,
    end: string,
    clientName: string,
    serviceDescription: string,
    completionState: string,
    revenue: number,
    pd: boolean,
    visitNote: VisitNoteType,
    transactions: ScheduleItemTransType[]
}

interface ScheduleItemTransType {
    uniqueId: string
}
interface AppActivityType {
    lastUpdate: string
}

interface UserDataType {
    _id: string,
    user: UserInfoType,
    appActivity: AppActivityType,
    clients: ClientType[],
    transactions: TransactionType[],
    schedule: ScheduleItemType[],
}

interface IntakeType {
    first: string,
    last: string,
    dob: string,
    sex: string,
    occupation: string,
    email: string,
    phone: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    ecName: string,
    ecPhone: string,
    ecRelationship: string,
    physName: string,
    physPhone: string,
    cause: string,
    firstNoticed: string,
    goals: string,
    pastTreatment: string,
    dailyStress: string,
    massageBefore: string,
    massage: {
        therapeutic: boolean,
        relaxation: boolean
    },
    pressure: string,
    respiratory: {
        asthma: boolean,
        bronchitis: boolean,
        chronicCough: boolean,
        sob: boolean
    },
    cardiovascular: {
        clots: boolean,
        cva1: boolean,
        cva2: boolean,
        coldFeet: boolean,
        coldHands: boolean,
        chf: boolean,
        heartDisease: boolean,
        hbp: boolean,
        lbp: boolean,
        heartAttack: boolean,
        mi: boolean,
        pacemaker: boolean,
        phlebitis: boolean,
        lymphedema: boolean,
        trombosis: boolean,
        varicose: boolean,
        stroke: boolean
    },
    skin: {
        bruise: boolean,
        hyper: boolean,
        melanoma: boolean,
        conditions: boolean,
        irritations: boolean
    },
    headNeck: {
        ear: boolean,
        headache: boolean,
        hearing: boolean,
        jawPain: boolean,
        migraines: boolean,
        sinus: boolean,
        visionLoss: boolean,
        visionProb: boolean
    },
    infectious: {
        athletes: boolean,
        hepatitis: boolean,
        herpes: boolean,
        hiv: boolean,
        respiratory: boolean,
        skin: boolean
    },
    women: {
        gyno: boolean,
        pregnancy: boolean
    },
    softJoint: {
        ankles: {
            left: boolean,
            right: boolean
        },
        arms: {
            left: boolean,
            right: boolean
        },
        feet: {
            left: boolean,
            right: boolean
        },
        hands: {
            left: boolean,
            right: boolean
        },
        hips: {
            left: boolean,
            right: boolean
        },
        knees: {
            left: boolean,
            right: boolean
        },
        legs: {
            left: boolean,
            right: boolean
        },
        lowerBack: {
            left: boolean,
            right: boolean
        },
        midBack: {
            left: boolean,
            right: boolean
        },
        neck: {
            left: boolean,
            right: boolean
        },
        shoulders: {
            left: boolean,
            right: boolean
        },
        upperBack: {
            left: boolean,
            right: boolean
        }
    },
    famHist: {
        cardio: boolean,
        respiratory: boolean
    },
    misc: {
        allergies: boolean,
        anaphylaxis: boolean,
        joints: boolean,
        arthritis: boolean,
        crohns: boolean,
        diabetes: boolean,
        digestive: boolean,
        dizziness: boolean,
        epilepsy: boolean,
        gout: boolean,
        hemophylia: boolean,
        insomnia: boolean,
        fibromyalgia: boolean,
        lupus: boolean,
        mental: boolean,
        osteoarthritis: boolean,
        sensation: boolean,
        otherDiag: boolean,
        otherMed: boolean,
        rheumatoid: boolean,
        osteoporosis: boolean,
        shingles: boolean,
        stress: boolean,
        surgical: boolean
    },
    neuro: {
        burning: boolean,
        palsy: boolean,
        disc: boolean,
        ms: boolean,
        numbness: boolean,
        parkinsons: boolean,
        stabbing: boolean,
        tingling: boolean
    },
    allergiesOther: string,
    meds: string,
    surgeries: string,
    skinIrritations: string,
    sick: string,
}