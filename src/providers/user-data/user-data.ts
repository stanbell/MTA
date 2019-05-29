import { Injectable } from '@angular/core';
import { MTAAPI } from '../mtaapi/mtaapi';
import { CacheProvider } from '../cache/cache';
import { HelpersProvider } from '../helpers/helpers';
import { EmptiesProvider } from '../empties/empties';
import { AuthProvider } from '../auth/auth';
import { DcsbAccountProvider } from '../dcsbaccount/dcsbaccount';
import '../../types/types';

const CACHE_ID = 'MTA_DATA';
const CONTENTS_ROUTE = 'contents';
const NEWUSER_ROUTE = 'newuser';
const CHECKUSER_ROUTE = 'checkuser';

// TODO: encrypt/decrypt package/unpackage before reads/wrires
// const MASTER_KEY = "Two roads diverged in a yellow wood,"
// robert frost, the road not taken

// login get user name  (temp, replace with authentication service to get user #)
// login look up user id #
// user-data get user data w/id #

@Injectable()
export class UserDataProvider {

  // userId: string;
  // userIdNumber: string;
  userData: UserDataType;
  private emptyUserData: UserDataType;
  private inCache: boolean = false;

  constructor(
    public helper: HelpersProvider,
    private cache: CacheProvider,
    private api: MTAAPI,
    public mt: EmptiesProvider,
    public auth: AuthProvider,
    public acct: DcsbAccountProvider) {
    this.emptyUserData = this.mt.getEmptyUserData();
  }

  private _dataWindow: Date;

  public get dataWindow(): Date {
    return this._dataWindow;
  }

  public set dataWindow(v: Date) {
    // v parameter ignored
    const DAY = 24 * 60 * 60 * 1000;
    const MONTH_1 = 30 * DAY;
    const MONTH_6 = 182 * DAY;
    const YEAR = 365 * DAY;

    switch (this.userData.user.listActive) {
      case '1m':
        this._dataWindow = new Date(Date.now() - MONTH_1);
        break;
      case '6m':
        this._dataWindow = new Date(Date.now() - MONTH_6);
        break;
      case '1y':
        this._dataWindow = new Date(Date.now() - YEAR);
        break;
      default:
        this._dataWindow = new Date(Date.now() - MONTH_1);
        break;
    }
  }

  initData() {
    this.userData = this.helper.deepCopy(this.mt.getEmptyUserData());
  }

  clearData() {
    this.initData();
  }

  // this already done in account.getAccount()
  // private async readIdNumber(user) {
  //   let route = 'mtausers/' + user + '?t=' + this.auth.accessToken;
  //   let serverReadData = await this.api.getData(route);
  //   // console.log(serverReadData);
  //   let serverReadObject = JSON.parse(serverReadData);
  //   this.userIdNumber = serverReadObject['contentsId'];
  // }

  async readData(user: string) {
    // console.log('reading');
    // replaced with account.nu. 
    // await this.readIdNumber(user);
    if (!this.acct.nu) {
      this.acct.getAccount();
    }

    // also reconciles most recent
    var localData: UserDataType = this.helper.deepCopy(this.emptyUserData);
    var serverData: UserDataType = this.helper.deepCopy(this.emptyUserData);
    var l: number, s: number;
    try {
      localData = await this.readLocal();
      // console.log('localData', localData);
      l = new Date(localData.appActivity.lastUpdate).valueOf();
      console.log('readData l=', l);
    }
    catch { l = 0; }

    try {
      serverData = await this.readServer();
      // console.log('serverData', serverData);
      s = new Date(serverData.appActivity.lastUpdate).valueOf();
      console.log('readData s=', s);
    }
    catch (err) { s = 0; }
    // NOTE: write updates userData.appActivity--make sure a re-read doesn't over-write
    if ((this.inCache) && (l > s)) {
      // if (l > s) {  // use local only if newer
      // also using lastUpdate to indicate empty local data
      //  needed to make new, empty userData after signup to start correctly
      this.userData = this.helper.deepCopy(localData);
    } else {
      this.userData = this.helper.deepCopy(serverData);
    }
    // console.log('userData', this.userData);
    // refresh
    this.dataWindow = new Date();
    this.writeData();
  }

  private async readLocal(): Promise<UserDataType> {
    // read from local cache
    var locallyRead: string = "";
    var locallyReadData: UserDataType;
    try {
      locallyRead = await this.cache.read(CACHE_ID + '_' + this.acct.nu.contentsId);
      this.inCache = true;
      locallyReadData = JSON.parse(locallyRead);
      return { ...this.emptyUserData, ...locallyReadData };
    }
    catch (err) {
      console.log('readLocal error ', err);
      this.inCache = false;
      locallyReadData = this.emptyUserData;
      locallyReadData.appActivity.lastUpdate = "1/1/1968"
      return this.emptyUserData;
    }
  }

  private async readServer(): Promise<UserDataType> {
    // TODO:  PUT IN A USER ID for reading from the api/mongo 
    var serverReadData: string = '';
    var serverReadObject: UserDataType;
    var route = CONTENTS_ROUTE + '/' + this.acct.nu.contentsId + '?t=' + this.auth.accessToken;
    try {
      serverReadData = await this.api.getData(route);  // TODO needs a value for the getData parameter
      serverReadObject = JSON.parse(serverReadData);
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
    // console.log('new activity', this.userData.appActivity.lastUpdate);
    // identical, unless you saved from a different device,
    //    then local & server might be different
    this.writeLocal(this.userData);
    this.writeServer(this.userData);
  }

  private writeLocal(data: UserDataType) {
    try {
      this.cache.write(CACHE_ID + '_' + this.acct.nu.contentsId, JSON.stringify(data));
      // console.log('wrote ' + CACHE_ID + '_' + this.acct.nu.contentsId);
    }
    catch (err) {
      console.log('writeLocal cache.write error', err);
    }
  }

  private writeServer(data: UserDataType) {
    let route = CONTENTS_ROUTE + '/' + this.acct.nu.contentsId + '?t=' + this.auth.accessToken;
    try {
      this.api.putData(route, JSON.stringify(data))
      // console.log('wrote ' + CONTENTS_ROUTE + '/' + this.acct.nu.contentsId);
    }
    catch (err) {
      console.log('writeServer mtaapi.putData error', err);
    }
  }

  createUser(newUser: SystemUserType) {
    let route = NEWUSER_ROUTE + '/';
    try {
      // console.log('createUser', newUser);
      this.api.postData(route, JSON.stringify(newUser))
        .then((d) => { console.log('wrote ', d); });
      // console.log('wrote ' + route);
    }
    catch (err) {
      console.log('writeLocal mtaapi.postData error', err);
    }

  }

  checkIdAvailable(newUser: string): Promise<boolean> {
    let route = CHECKUSER_ROUTE + '/' + newUser;
    return new Promise((resolve, reject) => {
      try {
        // console.log('checkUser', newUser);
        this.api.getData(route)
          .then(d => {
            const r = JSON.parse(d);
            if (r['status'] === 'in use') {
              resolve(false);
            } else {
              resolve(true);
            }
          });
      }
      catch (err) {
        reject(true);
      }
    });
  }

}
