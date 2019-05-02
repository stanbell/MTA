import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';

import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';


// import { AUTH_CONFIG } from './auth.config';
const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: 'KIiJdc6Akq07naDtGPlxN0uovg5mWDaY',
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: 'KIiJdc6Akq07naDtGPlxN0uovg5mWDaY',
  domain: 'stanbell.auth0.com',
  callbackURL: location.href,  // this was missing from the auth0 tutorial 3 quickstart but was in the blog
  packageIdentifier: 'com.dcsb.mta' // config.xml widget ID, e.g., com.auth0.ionic
};


@Injectable()
export class AuthProvider {
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  userProfile: any;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    public zone: NgZone,
    private storage: Storage
  ) {
    // TODO rename this local storage key "profile" to something else
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
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
    alert('reached client authorize');
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        alert(err);
        throw err;
      }
      alert('return from client authorize');
      alert('authResult.accessToken' + authResult.accessToken);
      // Set Access Token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      // Set Access Token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info
      alert('calling userInfo');
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          alert(err);
          throw err;
        }
        alert('return from client.userInfo');
        this.storage.set('profile', profile).then(val =>
          this.zone.run(() => this.userProfile = profile)
        );
      });
    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.userProfile = null;
    this.loggedIn = false;
  }

  // isAuthenticated(): boolean {
  //   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  //   return Date.now() < this.expiresAt;
  // }

}