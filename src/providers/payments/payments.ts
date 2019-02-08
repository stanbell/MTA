import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class PaymentsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PaymentsProvider Provider');
  }

}
