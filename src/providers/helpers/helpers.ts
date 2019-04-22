import { Injectable } from '@angular/core';

@Injectable()
export class HelpersProvider {

  constructor() {
    console.log('Hello HelpersProvider Provider');
  }

  lookupSelection = null;

  newGuid() {
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
    return dt + " " + ts;
  }
}