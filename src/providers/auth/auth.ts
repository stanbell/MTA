import { Injectable, NgZone } from '@angular/core';
// import { Storage } from '@ionic/storage';

import { AUTH_CONFIG } from './auth.config';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthProvider {
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  userProfile: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    public zone: NgZone,
    // private storage: Storage
  ) {
    // TODO rename this local storage key "profile" to something else
    // this.storage.get('profile').then(user => this.user = user);
    // this.storage.get('access_token').then(token => this.accessToken = token);
    // this.storage.get('expires_at').then(exp => {
    //   this.loggedIn = Date.now() < JSON.parse(exp);
    //   this.loading = false;
    // });
    this.loading = false;
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access'
      // initialScreen
      // audience: 'https://${auth0Config.domain}/userInfo'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }
      // Set Access Token
      // this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      // Set Access Token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      // this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        // this.storage.set('profile', profile).then(val =>
          // this.zone.run(() => this.userProfile = profile)
        // );
      });
    });
  }

  logout() {
    // this.storage.remove('profile');
    // this.storage.remove('access_token');
    // this.storage.remove('expires_at');
    this.accessToken = null;
    this.userProfile = null;
    this.loggedIn = false;
  }
}