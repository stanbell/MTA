import { Injectable } from '@angular/core';
import { UserDataProvider } from '../user-data/user-data';
import { EmptiesProvider } from '../empties/empties';
import '../../types/types';

@Injectable()
export class ClientsProvider {

  clients: ClientType[] = [];

  constructor(public ud: UserDataProvider,
    public mt: EmptiesProvider) {
  }

  init() {
    this.clients = [];
  }

  read() {
    this.sort();
    this.clients = this.ud.userData.clients;
  }

  add(c: ClientType) {
    this.clients.push(c);
  }

  sort() {
    this.ud.userData.clients.sort((a, b) => { return ((a.name > b.name) as any) - ((b.name > a.name) as any) });
  }

  refreshMetrics(){
    return new Promise<boolean>(resolve => {
      var todaysDate: Date = new Date()
      // todaysDate.setHours(0,0,0,0);
      this.ud.userData.clients.forEach((c) => {
        // re-init
        c.previousAppts = 0;
        c.noShowAppts = 0;
        c.scheduledAppts = 0;
        // filter appts to this client
        const ca: ScheduleItemType[] = this.ud.userData.schedule.filter((s) => (s.clientName === c.name));
        // add up each type
        ca.forEach((e) => {
          var ed: Date = new Date(e.start);
          // ed.setHours
          if (ed.valueOf() < todaysDate.valueOf()) {
            // past
            switch (e.completionState) {
              case 'Completed':
                c.previousAppts += 1;
                break;
              // case 'Cancelled':
              //   c.previousAppts += 1;
              //   break;
              case 'No Show':
                c.noShowAppts += 1;
                break;
              default:
                break;
            }
          } else {
            // future
            c.scheduledAppts += 1;
          }
        });
      });
      resolve(true);
    })
  }

}
