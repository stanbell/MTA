import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// routes:  mtauser/alpha-id, contents/_id (numeric)

@Injectable()
export class AuthapiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthapiProvider Provider');
  }

  // apiURL = 'http://127.0.0.1:19000/MTA/';  // testing
  // apiURL = 'http://35.162.31.157:19000/MTA/';  // elastic ip
  apiURL = 'https://api.dcsbdn.us:19000/MTA/'; // domain
  // local apiURL = 'http://127.0.0.1:19000/MTA/';

  authenticate(body: string): Promise<object> {
    const fullRoute = this.apiURL + 'authenticate';
    console.log('authenticate', fullRoute);
    console.log('authenticate', body);
    return new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      this.http.post(fullRoute, body,
        { headers: httpHeaders, observe: 'body', responseType: 'json' })
        // .timeout(7100)
        .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .put returns an object aleady
          (data) => {
            console.log('read from authenticate post', data);
            resolve(data);},
          (err) => reject(err));
    });
  }

  checkToken(token: string): Promise<boolean> {
    const fullRoute = this.apiURL + 'authenticate?token=' + token;
    console.log('authenticate', fullRoute);
    return new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      this.http.get(fullRoute,
        { headers: httpHeaders, observe: 'response', responseType: 'json' })
        // .timeout(7100)
        .subscribe(
          (resp) => {
            if (resp.status === 200) {
              resolve(true);
            } else {
              console.log(resp.status);
              resolve(false);
            }
          },
          (err) => {
            console.log(err);
            reject(false);
          });
    });
  }
}