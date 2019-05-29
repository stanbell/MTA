import { Injectable } from '@angular/core';
import { MTAAPI } from '../mtaapi/mtaapi';
import { AuthProvider } from '../auth/auth';
import { HelpersProvider } from '../helpers/helpers';
import { EmptiesProvider } from '../empties/empties';

@Injectable()
export class DcsbAccountProvider {

  nu: SystemUserType;

  constructor(
    public helper: HelpersProvider,
    public empties: EmptiesProvider,
    public api: MTAAPI,
    public auth: AuthProvider) {
    this.nu = empties.getEmptyNewUser();
  }

  async getAccount() {
    let route = 'mtausers/' + this.auth.user + '?t=' + this.auth.accessToken;
    try {
      const s = JSON.parse(await this.api.getData(route));
      this.nu = { ...this.nu, ...s };
      // this.nu = { ...s, ...this.nu };
    } catch (error) {
      console.log(error);
    }
  }

  async updateBilling(b: UserBillingInfoType) {
    // note actually replaces the whole mtausers record
    this.nu.billing = this.helper.deepCopy(b);
    let route = 'mtausers/' + this.auth.user + '?t=' + this.auth.accessToken;
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
    try {
      await this.api.putData(route, JSON.stringify(this.nu));
    } catch (error) {
      console.log(error);
    }
  }

  async cancelAccount(uid: string) {
    let route = 'canceluser/' + this.auth.user + '?t=' + this.auth.accessToken;  // WORKING HERE: reconcile nu._id
    try {
      await this.api.postData(route, "");
    } catch (error) {
      console.log(error);
    }
  }

}

