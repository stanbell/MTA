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

interface UserInfoType {
    id: string,
    pwd: string,
    businessName: string,
    address: AddressType,
    contacts: ContactInfoType[],
    calendar: CalendarType
}

interface CalendarType {
    id: string, //maybe
    name: string,
    provider: string, // ical or google
    connectionInfo: string, // TODO change when i learn what this needs to be
    owner: string, // userid or whatever for that native calendar
}

interface TransPartyType {
  id: string,  // client or service provider
  description: string,
  // sum of $$ over time?  no, save that for reporting
}

interface TransactionType {
  type: string,  // revenue (my services), service charges (i paid)
  description: string,
  amount: number,
  date: Date,
  reconciled: boolean,
  partyType: string, // client or service provider (ie, bank, cc processor)
  party: TransPartyType,
}

interface ClientType {
    id: string,
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
    start: Date,
    end: Date,
    completed: boolean,
    revenue: number,
    pd: boolean
}

interface AppActivityType {
    lastUpdate: string
}

interface UserDataType {
    user: UserInfoType,
    appActivity: AppActivityType,
    clients: ClientType[],
    transactions: TransactionType[],
    schedule: ScheduleItemType[],
}
