import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MTAAPI {
    constructor(private http: HttpClient) {
        console.log('Constructor MTAAPI Provider');
    }

    // apiURL = 'http://api.cpmez.com:22000/CarePlan/';
    apiURL = 'http://127.0.0.1:18000/MTA/';
    // local apiURL = 'http://127.0.0.1:18000/MTA/';
    // elastice ip apiURL = 'http://ec2-34-195-4-230.compute-1.amazonaws.com:22000/CarePlan/';
    // no longer valid ip apiURL = 'http://34.229.7.109:22000/CarePlan/';
    // old instance apiURL = 'http://ec2-34-229-7-109.compute-1.amazonaws.com:22000/CarePlan/';

    MASTER_KEY = "Two roads diverged in a yellow wood,"
    // robert frost, the road not taken

    getData(route: string): Promise<string> {
        // console.log('getData', route);
        const fullRoute = this.apiURL + route;
        console.log('getData', fullRoute);
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
        console.log('putData', fullRoute);
        // console.log('putData', body);
        return new Promise((resolve, reject) => {
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            });
            // headers = headers.set('authorization', 'Bearer ' + token);
            // let options = { headers: httpHeaders, observe: 'body' };
            this.http.put(fullRoute, body, 
                { headers: httpHeaders, observe: 'body', responseType: 'json' })
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .put returns an object aleady
                    (data) => resolve(data),
                    (err) => reject(err));
        });
    }
}
