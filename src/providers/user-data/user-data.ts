import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { LocalStoreProvider } from '../local-store/local-store';
import { MTAAPI } from '../mtaapi/mtaapi';
import { CacheProvider } from '../cache/cache';
import { HelpersProvider } from '../helpers/helpers';
import '../../types/types';


@Injectable()
export class UserDataProvider {

  userData: UserDataType;

  // private localData: UserDataType;
  // private serverData: UserDataType;
  // master data, responsible for persistence & reconciling remote

  constructor(public http: HttpClient,
    public helper: HelpersProvider,
    private cache: CacheProvider,
    // private store: LocalStoreProvider,
    private api: MTAAPI) {
  }

  initData() {
    this.userData = this.emptyUserData;
  }

  async readData() {
    // also reconciles most recent
    const localData = await this.readLocal();
    const serverData = await this.readServer();
    let l = new Date(localData.appActivity.lastUpdate).valueOf();
    let s = new Date(serverData.appActivity.lastUpdate).valueOf();
    // NOTE: write updates userData.appActivity--make sure a re-read doesn't over-write
    if (l >= s) {
      this.userData = this.helper.deepCopy(localData);
    } else {
      this.userData = this.helper.deepCopy(serverData);
    }
  }

  async readLocal(): Promise<UserDataType> {
    // read from local cache
    let locallyRead: string = await this.cache.read('MTA_DATA');
    // what if locallyRead doesn't parse well?
    let locallyReadData: UserDataType = JSON.parse(locallyRead);
    // to simplify matching object elements, merge in what we find
    // locallyReadData might be empty, resulting in localData staying empty
    return { ...this.emptyUserData, ...locallyReadData };
  }

  async readServer(): Promise<UserDataType> {
    // TODO:  PUT IN A USER ID for reading from the api/mongo 
    let serverReadData = await this.api.getData('');  // TODO needs a value for the getData parameter
    // note might be empty, so may stay empty after read
    return { ...this.emptyUserData, ...serverReadData };
  }

  writeData() {
    // both of these are async, but don't wait
    // set lastUpdate
    this.userData.appActivity.lastUpdate = new Date(Date.now()).toISOString();
    // identical, unless you saved from a different device,
    //    then local & server might be different
    this.writeLocal(this.userData);
    this.writeServer(this.userData);
  }
  
  writeLocal(data: UserDataType) {
    try {
    this.cache.write('MTA_DATA', JSON.stringify(data));
    }
    catch (err) {
      console.log('writeLocal cache.write error', err);
    }
  }
  
  writeServer(data: UserDataType) {
    try {
      this.api.putData('MTA_DATA', JSON.stringify(data));
    }
    catch (err) {
      console.log('writeLocal mtaapi.putData error', err);
    }
  }

  private emptyUserData: UserDataType = {
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
