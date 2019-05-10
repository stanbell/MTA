import { Injectable } from '@angular/core';
import { HelpersProvider } from '../helpers/helpers';
import { AuthapiProvider } from '../authapi/authapi';
import { LocalStoreProvider } from '../local-store/local-store';


const CRYPTO_KEY = "Open afresh your round of starry folds, Ye ardent marigolds!"  // Keats, I Stood Tiptoe, 1817

@Injectable()
export class AuthProvider {

  accessToken: string;
  user: string;
  password: string;
  tokenExpires: any;

  loggedIn: boolean = false;

  constructor(public helper: HelpersProvider,
    public ls: LocalStoreProvider,
    public api: AuthapiProvider) {
    console.log('Constructor AuthProvider Provider');
  }

  async checkToken() {
    await this.getCreds();
    this.loggedIn = this.goodToken();
  }

  async getCreds() {
    try {
      console.log('getting creds');
      var creds = await this.ls.get('creds');
      console.log(creds);
      try {
        creds = JSON.parse(this.helper.decrypt(creds, CRYPTO_KEY));
        console.log(creds);
      } catch (error) {
        console.log(error);
      }
      this.user = creds.user;
      this.accessToken = creds.accessToken;
      this.tokenExpires = creds.tokenExpires;
    } catch (error) {
      console.log(error);
    }
  }

  saveToken() {
    const creds = this.helper.encrypt(
      JSON.stringify({ user: this.user, accessToken: this.accessToken, tokenExpires: this.tokenExpires }),
      CRYPTO_KEY);
    console.log('saving creds');
    this.ls.set('creds', creds);
  }

  goodToken(): boolean {
    var good: boolean = false;
    console.log('accessToken', this.accessToken);
    if (!!this.accessToken) {
      if (this.accessToken.length === 36) {  // depends on helpers.newGuid length
        if (this.accessToken.charAt(4) === 'f'
          && this.accessToken.charAt(17) === '7'
          && this.accessToken.charAt(27) === 'b')
          good = true;
      }
      if (!!this.tokenExpires) {
        if (new Date(this.tokenExpires).valueOf() > Date.now()) {
          good = true;
        }
      }
    }
    return good;
  }

  async login(id: string, pwd: string) {
    var body = {
      creds: this.helper.encrypt(this.packageCreds(id, pwd), CRYPTO_KEY)
    };
    console.log(JSON.stringify(body));
    try {
      const authResponse = await this.api.authenticate(JSON.stringify(body))
      this.user = id;
      this.accessToken = authResponse['accessToken'];
      this.tokenExpires = authResponse['tokenExpires'];
      this.loggedIn = true;
      this.saveToken();
    }
    catch (err) {
      console.log('authentication error ', err);
      this.user = undefined;  // TODO:  save for working offline
      this.loggedIn = false;
      this.accessToken = undefined;
      this.tokenExpires = undefined;
      this.password = undefined;
      this.saveToken();
    }
  }
  
  logout() {
    this.user = undefined;  // TODO:  save for working offline
    this.loggedIn = false;
    this.accessToken = undefined;
    this.tokenExpires = undefined;
    this.password = undefined;
    this.saveToken();
  }

  async mockLogIn() {
    this.user = 'joe';
    this.user = 'abc';
    this.loggedIn = true;
  }

  packageCreds(id: string, pwd: string): string {
    return JSON.stringify({
      user: id,
      password: pwd
    });
  }

}
