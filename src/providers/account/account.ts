// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MTAAPI } from '../mtaapi/mtaapi';
import { AuthProvider } from '../auth/auth';
import { HelpersProvider } from '../helpers/helpers';
import { EmptiesProvider } from '../empties/empties';

// routes:  contents/_id (numeric)

@Injectable()
export class AccountProvider {

  nu: SystemUserType;

  constructor(
    public helper: HelpersProvider,
    public empties: EmptiesProvider,
    public api: MTAAPI,
    public auth: AuthProvider) {
    console.log('Constructor AccountProvider Provider');
    this.nu = empties.getEmptyNewUser();
    // this.getAccount();
    // console.log(this.nu);
  }

  async getAccount() {
    let route = 'mtausers/' + this.auth.user + '?t=' + this.auth.accessToken;
    try {
      const s = JSON.parse(await this.api.getData(route));
      console.log(s);
      this.nu = {...s, ...this.nu};
      console.log(this.nu);
    } catch (error) {
      console.log(error);
    }
  }

  async updateBilling(b: UserBillingInfoType) {
    // note actually replaces the whole mtausers record
    this.nu.billing = this.helper.deepCopy(b);
    let route = 'mtausers/' + this.auth.user + '?t=' + this.auth.accessToken;
    console.log(this.nu);
    try {
      await this.api.putData(route, JSON.stringify(this.nu));
    } catch (error) {
      console.log(error);
    }
  }

  async resetPwd(newPwd: string) {
    // note actually replaces the whole mtausers record
    this.nu.pwd = newPwd;
    let route = 'mtausers/' + this.auth.user + '?t=' + this.auth.accessToken;
    console.log(this.nu);
    try {
      await this.api.putData(route, JSON.stringify(this.nu));
    } catch (error) {
      console.log(error);
    }
  }

}

