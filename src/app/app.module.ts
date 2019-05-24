import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Calendar } from '@ionic-native/calendar';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
// import { Auth0Provider } from '../providers/auth0/auth0';
import { UserDataProvider } from '../providers/user-data/user-data';
import { ClientsProvider } from '../providers/clients/clients';
import { TransactionsProvider } from '../providers/transactions/transactions';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { DocumentsProvider } from '../providers/documents/documents';
import { HelpersProvider } from '../providers/helpers/helpers';
import { MTAAPI } from '../providers/mtaapi/mtaapi';
import { CCAPI } from '../providers/ccapi/ccapi';
import { CacheProvider } from '../providers/cache/cache';
import { LocalStoreProvider } from '../providers/local-store/local-store';
// import { Stripe } from '@ionic-native/stripe/ngx';

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
import { EmptiesProvider } from '../providers/empties/empties';
import { LookupPage } from '../pages/lookup/lookup';
import { UserProvider } from '../providers/user/user';
import { UserDataWriterProvider } from '../providers/user-data-writer/user-data-writer';
import { AuthProvider } from '../providers/auth/auth';
import { AuthapiProvider } from '../providers/authapi/authapi';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { EditContactPage } from '../pages/edit-contact/edit-contact';
import { StatsPage } from '../pages/stats/stats';
import { EditServicePage } from '../pages/edit-service/edit-service';
import { SignupPage } from '../pages/signup/signup';
import { PaymentPage } from '../pages/payment/payment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BiznavPage } from '../pages/biznav/biznav';
import { BiztodayPage } from '../pages/biztoday/biztoday';
import { AccountPage } from '../pages/account/account';
import { AccountProvider } from '../providers/account/account';
import { DownloadPage } from '../pages/download/download';
// import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
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
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
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
    UserDataProvider,
    ClientsProvider,
    TransactionsProvider,
    ScheduleProvider,
    DocumentsProvider,
    HelpersProvider,
    MTAAPI,
    CCAPI,
    CacheProvider,
    LocalStoreProvider,
    Storage,
    Calendar,
    EventPage,
    DocumentsProvider,
    InAppBrowser,
    EmptiesProvider,
    UserProvider,
    UserDataWriterProvider,
    AuthProvider,
    AuthapiProvider,
    AccountProvider,
    // File,
  ]
})
export class AppModule {}
