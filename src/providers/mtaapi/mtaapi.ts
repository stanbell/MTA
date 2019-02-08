import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemOptions } from 'ionic-angular';

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

    getData(type: string): Promise<object> {
        console.log('getData', type);
        return new Promise((resolve, reject) => {
            this.http.get(type)
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .get returns an object aleady
                    (data) => resolve(data),
                    (err) => reject(err));
        });
    }

    putData(type: string, body: string): Promise<object> {
        console.log('putData', type);
        return new Promise((resolve, reject) => {
            // TODO get an example
            let headers: HttpHeaders = new HttpHeaders();
            let options = {

            };
            this.http.put(this.apiURL, body, options)
                // .timeout(7100)
                .subscribe( // note just changed JSON.stringify(data) to (data) bc i think .put returns an object aleady
                    (data) => resolve(data),
                    (err) => reject(err));
        });
    }
}
