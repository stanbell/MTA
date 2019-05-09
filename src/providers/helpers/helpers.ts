import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import CryptoJS from 'crypto-js';

const MINUTE = 1000 * 60;


@Injectable()
export class HelpersProvider {

  constructor(public plt: Platform) {
    console.log('Hello HelpersProvider Provider');
  }

  private _lookupSelection: LookupSelectionType = null;  // used to pass responses from lookups, cleared immediately after reading


  public get lookupSelection(): LookupSelectionType {
    const v: any = this._lookupSelection;
    // clear after use
    this._lookupSelection = null;
    return v;
  }

  public set lookupSelection(v: LookupSelectionType) {
    this._lookupSelection = v;
  }

  // automatically choose console.log or alert based on platform
  signal(...args: any[]) {
    if (this.plt.is('cordova')) {
      args.forEach(e => {
        if (typeof e == "object") {
          alert(JSON.stringify(e));
        } else {
          alert(e);
        }
      });
    } else {
      console.log(args);
    }
  }

  newGuid() {
    //               1         2         3      
    //      123456789012345678901234567890123456
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  deepCopy(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
      }
      return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  // strings
  upshiftInitial(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  // dates & times
  formatTime(d: any): string {
    const ts = new Date(d).toTimeString();
    const hr = parseInt(ts.slice(0, 2));
    const hrs = (hr > 12) ? (hr - 12) : hr;
    const ampm = (hr > 12) ? 'pm' : 'am';
    return hrs.toString() + ':' + ts.slice(3, 5) + ampm;
  }

  formatDate(d: any): string {
    const fd = new Date(d);
    return (fd.getMonth() + 1) + '/' + fd.getDate() + '/' + fd.getFullYear();
  }
  formatDateTime24(d: any): string {
    const fd = new Date(d);
    const dt = this.formatDate(fd);
    const ts = fd.toTimeString();
    console.log('formatDateTime24', ts);
    return dt + " " + ts;
  }

  convertToISO(d: string): string {
    const offset: number = new Date().getTimezoneOffset() * MINUTE;
    var workDate: Date = new Date(d);
    workDate = new Date(workDate.valueOf() - offset);
    return workDate.toISOString();
  }

  convertFromISO(d: string): string {
    const offset: number = new Date().getTimezoneOffset() * MINUTE;
    var workDate: Date = new Date(d);
    workDate = new Date(workDate.valueOf() + offset);
    return this.formatDateTime24(workDate);
    // return workDate.toString();
  }

  timeDiff(time1: Date, time2: Date): number {
    const t1: number = new Date(time1).valueOf();
    const t2: number = new Date(time2).valueOf();
    // return Math.abs(t1 - t2);
    return (t1 - t2);
  }

  addTimeInterval(time1: Date, interval: number): Date {
    // interval expected in milliseconds
    return new Date(time1.getTime() + (isNaN(interval) ? 0 : interval));
  }

  encrypt(data: string, key: string): string {
    // console.log("encrypting");
    // console.log("key", key);
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  decrypt(data: string, key: string): string {
    // console.log('decrypting');
    // console.log("key", key);
    const bytes = CryptoJS.AES.decrypt(data, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }


}