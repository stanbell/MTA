import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import '../../types/types';

@Injectable()
export class CCAPI {
    constructor(private http: HttpClient) {
        console.log('Constructor CCAPI Provider');
    }

    // apiURL = 'http://api.cpmez.com:22000/CarePlan/';
    // apiURL = 'http://127.0.0.1:48000/mtacc/';
    apiURL = 'http://54.191.45.45:48000/mtacc/';
    // local apiURL = 'http://127.0.0.1:18000/MTA/';
    // elastice ip apiURL = 'http://ec2-34-195-4-230.compute-1.amazonaws.com:22000/CarePlan/';
    // no longer valid ip apiURL = 'http://34.229.7.109:22000/CarePlan/';
    // old instance apiURL = 'http://ec2-34-229-7-109.compute-1.amazonaws.com:22000/CarePlan/';

    httpHeaders: any;

    putData(route: string, headers: HttpHeaders, body: PaymentRequestType): Promise<object> {
        // console.log('putData', route);
        const fullRoute = this.apiURL + route;
        console.log('putData', fullRoute);
        // console.log('putData', JSON.stringify(body));
        console.log('putData', body);
        // console.log('putData', body);
        return new Promise((resolve, reject) => {
            // headers = headers.set('authorization', 'Bearer ' + token);
            // let options = { headers: httpHeaders, observe: 'body' };
            this.http.post(fullRoute, body,
                { headers: headers, observe: 'body', responseType: 'json' })
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .put returns an object aleady
                    (data) => resolve(data),
                    (err) => reject(err));
        });
    }
}
