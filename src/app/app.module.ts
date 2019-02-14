import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar, CalendarOriginal } from '@ionic-native/calendar';


import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserDataProvider } from '../providers/user-data/user-data';
import { ClientsProvider } from '../providers/clients/clients';
import { TransactionsProvider } from '../providers/transactions/transactions';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { DocumentsProvider } from '../providers/documents/documents';
import { HelpersProvider } from '../providers/helpers/helpers';
import { MTAAPI } from '../providers/mtaapi/mtaapi';
import { CacheProvider } from '../providers/cache/cache';
import { LocalStoreProvider } from '../providers/local-store/local-store';

import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { ClientsPage } from '../pages/clients/clients';
import { TransactionsPage } from '../pages/transactions/transactions';
import { SettingsPage } from '../pages/settings/settings';
import { BusinessPage } from '../pages/business/business';
import { HomePage } from '../pages/home/home';
import { ClientPage } from '../pages/client/client';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarProvider } from '../providers/calendar/calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SchedulePage,
    ClientsPage,
    ClientPage,
    TransactionsPage,
    SettingsPage,
    BusinessPage,
    CalendarPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    CalendarOriginal,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SchedulePage,
    ClientsPage,
    ClientPage,
    TransactionsPage,
    SettingsPage,
    BusinessPage,
    CalendarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserDataProvider,
    ClientsProvider,
    TransactionsProvider,
    ScheduleProvider,
    DocumentsProvider,
    HelpersProvider,
    MTAAPI,
    CacheProvider,
    LocalStoreProvider,
    Storage,
    CalendarProvider,
  ]
})
export class AppModule {}
