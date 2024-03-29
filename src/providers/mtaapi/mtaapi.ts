import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// routes:  mtauser/alpha-id, contents/_id (numeric)

@Injectable()
export class MTAAPI {
    constructor(private http: HttpClient) {
        // console.log('Constructor MTAAPI Provider');
    }

    // apiURL = 'http://127.0.0.1:18000/MTA/';
    // apiURL = 'http://35.162.31.157:18000/MTA/';  // elastic ip
    apiURL = 'https://api.dcsbdn.us:18000/MTA/'; // domain
    // local apiURL = 'http://127.0.0.1:18000/MTA/';

    getData(route: string): Promise<string> {
        // console.log('getData', route);
        const fullRoute = this.apiURL + route;
        // console.log('getData', fullRoute);
        return new Promise((resolve, reject) => {
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'If-Modified-Since': '1 Jan 1990',
                'Cache-Control': 'no-cache'
            });
            this.http.get(fullRoute, 
                { headers: httpHeaders, observe: 'body', responseType: 'json' })
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .get returns an object aleady
                    (data) => resolve(JSON.stringify(data)),
                    (err) => reject(err));
        });
    }

    putData(route: string, body: string): Promise<object> {
        // console.log('putData', route);
        const fullRoute = this.apiURL + route;
        // console.log('putData', fullRoute);
        // console.log('putData', body);
        return new Promise((resolve, reject) => {
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            });
            this.http.put(fullRoute, body, 
                { headers: httpHeaders, observe: 'body', responseType: 'json' })
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .put returns an object aleady
                    (data) => resolve(data),
                    (err) => reject(err));
        });
    }

    postData(route: string, body: string): Promise<object> {
        const fullRoute = this.apiURL + route;
        // console.log('postData', fullRoute);
        // console.log('postData', body);
        return new Promise((resolve, reject) => {
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            });
            this.http.post(fullRoute, body, 
                { headers: httpHeaders, observe: 'body', responseType: 'json' })
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .put returns an object aleady
                    (data) => resolve(data),
                    (err) => reject(err));
        });
    }
}
