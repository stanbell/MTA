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
    var s: ScheduleItemType[] = [];
    s = this.ud.userData.schedule;
    this.scheduleItems = s.filter((f) => {
      return (new Date(f.start).valueOf() > this.ud.dataWindow.valueOf());
    });
  }

  add(s: ScheduleItemType) {
    this.scheduleItems.push(s);
    this.ud.userData.schedule.push(s);
  }

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
