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
interface PayPalPaymentsType {
    key: string
}
interface MerchantAcctType {
    acct: string
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
    paypal: PayPalPaymentsType,
    merch: MerchantAcctType
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
    uniqueId: string,
    apptId: string,
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
    previousAppts: number,
    noShowAppts: number,
    scheduledAppts: number,
    recurringScheduled: boolean
}

interface ScheduleItemType {
    id: string,  // of the individual event
    calendar: string,
    provider: string, // ical or google?
    providerItemId: string, // of the event
    start: string,
    end: string,
    clientName: string,
    serviceDescription: string,
    completed: boolean,
    revenue: number,
    pd: boolean,
    visitNote: string,  // actual, or foreignkey reference?
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
