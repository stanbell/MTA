import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandler, NgModule } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HelpersProvider } from '../providers/helpers/helpers';
import { EmptiesProvider } from '../providers/empties/empties';

import { MTAAPI } from '../providers/mtaapi/mtaapi';
import { CCAPI } from '../providers/ccapi/ccapi';
import { AuthapiProvider } from '../providers/authapi/authapi';

import { LocalStoreProvider } from '../providers/local-store/local-store';
import { CacheProvider } from '../providers/cache/cache';

import { AuthProvider } from '../providers/auth/auth';
import { DcsbAccountProvider } from '../providers/dcsbaccount/dcsbaccount';

import { UserDataProvider } from '../providers/user-data/user-data';
import { UserDataWriterProvider } from '../providers/user-data-writer/user-data-writer';
import { UserProvider } from '../providers/user/user';
import { ClientsProvider } from '../providers/clients/clients';
import { TransactionsProvider } from '../providers/transactions/transactions';
import { ScheduleProvider } from '../providers/schedule/schedule';

import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ClientsPageModule } from '../pages/clients/clients.module';
import { ClientPageModule } from '../pages/client/client.module';
import { TransactionsPageModule } from '../pages/transactions/transactions.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { BusinessPageModule } from '../pages/business/business.module';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import { EventPageModule } from '../pages/event/event.module';
import { AppointmentsPageModule } from '../pages/appointments/appointments.module';
import { NavoptionsPageModule } from '../pages/navoptions/navoptions.module';
import { ClientInfoPageModule } from '../pages/client-info/client-info.module';
import { StripePaymentPageModule } from '../pages/stripe-payment/stripe-payment.module';
import { IntakePageModule } from '../pages/intake/intake.module';
import { LookupPageModule } from '../pages/lookup/lookup.module';
import { EditEventPageModule } from '../pages/edit-event/edit-event.module';
import { EditContactPageModule } from '../pages/edit-contact/edit-contact.module';
import { StatsPageModule } from '../pages/stats/stats.module';
import { EditServicePageModule } from '../pages/edit-service/edit-service.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { PaymentPageModule } from '../pages/payment/payment.module';
import { BiznavPageModule } from '../pages/biznav/biznav.module';
import { BiztodayPageModule } from '../pages/biztoday/biztoday.module';
import { AccountPageModule } from '../pages/account/account.module';
import { DownloadPageModule } from '../pages/download/download.module';


import { LoginPage } from '../pages/login/login';
import { ClientsPage } from '../pages/clients/clients';
import { TransactionsPage } from '../pages/transactions/transactions';
import { SettingsPage } from '../pages/settings/settings';
import { BusinessPage } from '../pages/business/business';
import { HomePage } from '../pages/home/home';
import { ClientPage } from '../pages/client/client';
import { CalendarPage } from '../pages/calendar/calendar';
import { EventPage } from '../pages/event/event';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { NavoptionsPage } from '../pages/navoptions/navoptions';
import { ClientInfoPage } from '../pages/client-info/client-info';
import { StripePaymentPage } from '../pages/stripe-payment/stripe-payment';
import { IntakePage } from '../pages/intake/intake';
import { LookupPage } from '../pages/lookup/lookup';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { EditContactPage } from '../pages/edit-contact/edit-contact';
import { StatsPage } from '../pages/stats/stats';
import { EditServicePage } from '../pages/edit-service/edit-service';
import { SignupPage } from '../pages/signup/signup';
import { PaymentPage } from '../pages/payment/payment';
import { BiznavPage } from '../pages/biznav/biznav';
import { BiztodayPage } from '../pages/biztoday/biztoday';
import { AccountPage } from '../pages/account/account';
import { DownloadPage } from '../pages/download/download';
import { StripeProvider } from '../providers/stripe/stripe';


@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // LoginPage,
    // ClientsPage,
    // ClientPage,
    // TransactionsPage,
    // SettingsPage,
    // BusinessPage,
    // CalendarPage,
    // EventPage,
    // AppointmentsPage,
    // NavoptionsPage,
    // ClientInfoPage,
    // StripePaymentPage,
    // IntakePage,
    // LookupPage,
    // EditEventPage,
    // EditContactPage,
    // StatsPage,
    // EditServicePage,
    // SignupPage,
    // PaymentPage,
    // BiznavPage,
    // BiztodayPage,
    // AccountPage,
    // DownloadPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,

    HomePageModule,
    LoginPageModule,
    ClientsPageModule,
    ClientPageModule,
    TransactionsPageModule,
    SettingsPageModule,
    BusinessPageModule,
    CalendarPageModule,
    EventPageModule,
    AppointmentsPageModule,
    NavoptionsPageModule,
    ClientInfoPageModule,
    StripePaymentPageModule,
    IntakePageModule,
    LookupPageModule,
    EditEventPageModule,
    EditContactPageModule,
    StatsPageModule,
    EditServicePageModule,
    SignupPageModule,
    PaymentPageModule,
    BiznavPageModule,
    BiztodayPageModule,
    AccountPageModule,
    DownloadPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ClientsPage,
    ClientPage,
    TransactionsPage,
    SettingsPage,
    BusinessPage,
    CalendarPage,
    EventPage,
    AppointmentsPage,
    NavoptionsPage,
    ClientInfoPage,
    StripePaymentPage,
    IntakePage,
    LookupPage,
    EditEventPage,
    EditContactPage,
    StatsPage,
    EditServicePage,
    SignupPage,
    PaymentPage,
    BiznavPage,
    BiztodayPage,
    AccountPage,
    DownloadPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Storage,
    Calendar,
    InAppBrowser,
    HelpersProvider,
    EmptiesProvider,
    MTAAPI, 
    CCAPI,
    AuthapiProvider,
    LocalStoreProvider,
    CacheProvider,
    AuthProvider,
    DcsbAccountProvider,
    UserDataProvider,
    UserDataWriterProvider,
    UserProvider,
    ClientsProvider,
    TransactionsProvider,
    ScheduleProvider,
    StripeProvider,
  ]
})
export class AppModule {}
