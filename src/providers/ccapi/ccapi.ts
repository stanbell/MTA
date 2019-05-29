import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import '../../types/types';

@Injectable()
export class CCAPI {
    constructor(private http: HttpClient) {
        // console.log('Constructor CCAPI Provider');
    }

    // apiURL = 'http://127.0.0.1:48000/mtacc/';
    // apiURL = 'https://35.162.31.157:48000/mtacc/'; // elastic ip
    apiURL = 'https://api.dcsbdn.us:48000/mtacc/';  // domain

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
