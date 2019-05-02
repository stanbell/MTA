import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import '../../types/types';

@Injectable()
export class ScheduleProvider {

  scheduleItems: ScheduleItemType[] = [];

  constructor(public ud: UserDataProvider) {
  }

  init() {
    this.scheduleItems = [];
  }

  read() {
    this.scheduleItems = this.ud.userData.schedule;
  }

  add(t: ScheduleItemType) {
    this.scheduleItems.push(t);
  }

  // remove(i: number) {
  //   this.scheduleItems.splice(i, 1);
  // }

  // replace(i: number, t: ScheduleItemType) {
  //   this.scheduleItems[i] = this.helper.deepCopy(t);
  // }

  hasAppt(d: Date): boolean {
    const sdv = new Date(d).setHours(0, 0, 0, 0).valueOf();
    return this.scheduleItems
      .some(x => (new Date(x.start).setHours(0, 0, 0, 0).valueOf() === sdv));
  }

  selectDate(d: Date): ScheduleItemType[] {
    let sd = new Date(d).setHours(0, 0, 0, 0);
    return this.scheduleItems
      .filter(x => (new Date(x.start).setHours(0, 0, 0, 0) === sd));
  }

}


  // following was bad idea because required selective write()
  // readAll(): ScheduleItemType[] {
  //   this.scheduleItems = this.ud.userData.schedule;
  //   return this.scheduleItems;
  // }
  // readClient(client: string) {
  //   this.scheduleItems =
  //     this.ud.userData.schedule
  //       .filter(x => (x.clientName === client));
  // }
  // readDates(start: Date, end?: Date) {
  //   let sd = new Date(start).setHours(0, 0, 0, 0);
  //   // implementation of end not currently needed, 
  //   //  NOT debugged
  //   // if (end) {
  //   //   let ed = new Date(end).setHours(23, 59, 59, 59);
  //   //   this.scheduleItems =
  //   //     this.ud.userData.schedule
  //   //       .filter(x => (new Date(x.start).setHours(0, 0, 0, 0).valueOf() >= sd.valueOf())
  //   //         && new Date(x.start).setHours(0, 0, 0, 0) <= ed.valueOf()));
  //   // }
  //   // else { // start date only supplied
  //     this.scheduleItems =
  //       this.ud.userData.schedule
  //         .filter(x => (new Date(x.start).setHours(0, 0, 0, 0) === sd));
  //   // }
  // }
