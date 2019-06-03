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
    this.sort();
    var s: ScheduleItemType[] = [];
    s = this.ud.userData.schedule;
    this.scheduleItems = s.filter((f) => {
      return (new Date(f.start).valueOf() > this.ud.dataWindow.valueOf());
    });
  }

  sort() {
    this.ud.userData.schedule.sort((a, b) => {
      const ad = new Date(a.start).valueOf();
      const bd = new Date(b.start).valueOf();
      return ((ad > bd) as any) - ((bd > ad) as any); 
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
