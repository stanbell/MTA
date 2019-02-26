import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import { HelpersProvider } from '../helpers/helpers';
import '../../types/types';

@Injectable()
export class ScheduleProvider {

  scheduleItems: ScheduleItemType[] = [];

  constructor(public ud: UserDataProvider,
    public helper: HelpersProvider) {
  }

  init() {
    this.scheduleItems = [];
  }

  read() {
    this.scheduleItems = this.ud.userData.schedule;
  }
  
  write() {
    this.ud.userData.schedule = this.scheduleItems;
  }

  add(t: ScheduleItemType) {
    this.scheduleItems.push(t);
  }

  remove(i: number) {
    this.scheduleItems.splice(i, 1);
  }

  replace(i: number, t: ScheduleItemType) {
    this.scheduleItems[i] = this.helper.deepCopy(t);
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
