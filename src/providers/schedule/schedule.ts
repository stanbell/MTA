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
