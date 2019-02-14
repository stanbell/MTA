import { Injectable } from '@angular/core';
import { MTAAPI } from '../mtaapi/mtaapi';
import { CacheProvider } from '../cache/cache';
import { HelpersProvider } from '../helpers/helpers';
import '../../types/types';

const CACHE_ID = 'MTA_DATA';
const SERVER_ROUTE = 'contents';

// login get user name  (temp, replace with authentication service to get user #)
// login look up user id #
// user-data get user data w/id #

@Injectable()
export class UserDataProvider {

  userId: string;
  userIdNumber: string;
  userData: UserDataType;

   constructor(
    public helper: HelpersProvider,
    private cache: CacheProvider,
    private api: MTAAPI) {
  }

  initData() {
    this.userData = this.emptyUserData;
  }

  clearData() {
    this.userData = this.emptyUserData;
  }

  async readIdNumber() {
    let serverReadData = await this.api.getData('mtausers/' + this.userId);
    console.log(serverReadData);
    let serverReadObject = JSON.parse(serverReadData);
    this.userIdNumber = serverReadObject['contentsId'];
  }

  async readData() {
    // also reconciles most recent
    let localData: UserDataType = this.emptyUserData;
    let serverData: UserDataType = this.emptyUserData;
    let l: number, s: number;
    try {
      localData = await this.readLocal();
      l = new Date(localData.appActivity.lastUpdate).valueOf();
      console.log('readData l=', l);
    }
    catch { l = 0; }

    try {
      serverData = await this.readServer();
      s = new Date(serverData.appActivity.lastUpdate).valueOf();
      console.log('readData s=', s);
    }
    catch (err) { s = 0; }
    // NOTE: write updates userData.appActivity--make sure a re-read doesn't over-write
    if (l >= s) {
      this.userData = this.helper.deepCopy(localData);
    } else {
      this.userData = this.helper.deepCopy(serverData);
    }
    // console.log('userData', this.userData);
    // refresh
    this.writeData();
  }

  async readLocal(): Promise<UserDataType> {
    // read from local cache
    try {
      let locallyRead: string = await this.cache.read(CACHE_ID + '_' + this.userIdNumber);
      // console.log('readLocal', locallyRead);
      // what if locallyRead doesn't parse well?
      let locallyReadData: UserDataType = JSON.parse(locallyRead);
      // to simplify matching object elements, merge in what we find
      // locallyReadData might be empty, resulting in localData staying empty
      return { ...this.emptyUserData, ...locallyReadData };
    }
    catch (err) {
      console.log('readLocal error ', err);
      return this.emptyUserData;
    }
  }

  async readServer(): Promise<UserDataType> {
    // TODO:  PUT IN A USER ID for reading from the api/mongo 
    let serverReadData: string = '';
    let serverReadObject: UserDataType;
    try {
      serverReadData = await this.api.getData(SERVER_ROUTE + '/' + this.userIdNumber);  // TODO needs a value for the getData parameter
      serverReadObject = JSON.parse(serverReadData);
      // console.log('readServer ', serverReadData);
      // console.log('readServer ', serverReadObject);
      // note might be empty, so may stay empty after read
      // const t = { ...this.emptyUserData, ...serverReadObject };
      // console.log(t);
      return { ...this.emptyUserData, ...serverReadObject };
    }
    catch (err) {
      console.log('readServer error ', err);
      return this.emptyUserData;
    }
  }

  writeData() {
    // both of these are async, but don't wait
    // set lastUpdate
    this.userData.appActivity.lastUpdate = new Date(Date.now()).toISOString();
    console.log('new activity', this.userData.appActivity.lastUpdate);
    // identical, unless you saved from a different device,
    //    then local & server might be different
    this.writeLocal(this.userData);
    this.writeServer(this.userData);
  }

  writeLocal(data: UserDataType) {
    try {
      this.cache.write(CACHE_ID + '_' + this.userIdNumber, JSON.stringify(data));
      console.log('wrote ' + CACHE_ID + '_' + this.userIdNumber);
    }
    catch (err) {
      console.log('writeLocal cache.write error', err);
    }
  }

  writeServer(data: UserDataType) {
    try {
      // console.log('writeServer', data);
      this.api.putData(SERVER_ROUTE + '/' + this.userIdNumber, JSON.stringify(data))
        // .then((d) => { console.log('wrote ', d); });
      console.log('wrote ' + SERVER_ROUTE + '/' + this.userIdNumber);
    }
    catch (err) {
      console.log('writeLocal mtaapi.putData error', err);
    }
  }

  private emptyUserData: UserDataType = {
    _id: '',
    user: {
      id: '',
      pwd: '',
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
      }
    },
    appActivity: {
      lastUpdate: "01/01/1968"  // pretty old date
    },
    clients: [],
    transactions: [],
    schedule: []
  }

}
