import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


const SIXMONTHS = 180;

@IonicPage()
@Component({
  selector: 'page-download',
  templateUrl: 'download.html',
})
export class DownloadPage {

  timeframe: string = 'all';
  fromDateD: Date;
  fromDate: string;
  toDateD: Date;
  toDate: string;
  format: string = 'csv';
  includeClients: boolean = true;
  includeAppts: boolean = true;
  includeTransactions: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    private trans: FileTransfer,
    private file: File,
    public helper: HelpersProvider,
    public ud: UserDataProvider) {
    this.fromDateD = new Date();
    this.fromDateD.setHours(0, 0, 0);
    this.fromDateD.setDate(this.fromDateD.getDate() - SIXMONTHS);
    this.fromDate = this.fromDateD.toISOString();
    console.log(this.fromDateD.toDateString());
    this.toDateD = new Date();
    this.toDateD.setHours(0, 0, 0);
    this.toDate = this.toDateD.toISOString();
    console.log(this.toDateD.toDateString());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DownloadPage');
  }


  download() {

    // MAYBE, do this only on browser (code below includes mobiles)


    // prep data =====
    var DD: any = {};
    DD.business = this.ud.userData.user.businessName;
    DD.download = {};
    if (this.timeframe === 'all') {
      DD.download.dates = 'all';
    } else {
      // reset dates from entries
      this.fromDateD = new Date(this.fromDate);
      this.toDateD = new Date(this.toDate);
      DD.download.dates = { fromDate: this.fromDate, toDate: this.toDate };
    }
    DD.download.including = [];
    // sections
    // clients
    if (this.includeClients) {
      DD.download.including.push('Clients');
      DD.clients = [];
      // excluded intake form and presentation elements that might be stored
      this.ud.userData.clients.forEach((e) => {
        var c = {
          name: e.name,
          address: e.address,
          contacts: e.contacts,
          preferences: e.preferences
        }
        DD.clients.push(c);
      });
    }
    // appointments
    if (this.includeAppts) {
      DD.download.including.push('Appointments');
      if (this.timeframe === 'all') {
        DD.appointments = this.ud.userData.schedule;
      } else {
        // filter dates
        DD.appointments = this.ud.userData.schedule.filter((f) => {
          return ((new Date(f.start).valueOf() >= this.fromDateD.valueOf())
            && (new Date(f.start).valueOf() <= this.toDateD.valueOf()));
        });
      }
      // exclude transactions (attached to appts)
      DD.appointments.forEach((e) => {
        if (e.transactions) delete e.transactions;
      });
    }
    // transactions
    if (this.includeTransactions) {
      DD.download.including.push('Transactions');
      if (this.timeframe === 'all') {
        DD.transactions = this.ud.userData.transactions;
      } else {
        // filter dates
        DD.transactions = this.ud.userData.transactions.filter((t) => {
          return ((new Date(t.date).valueOf() >= this.fromDateD.valueOf())
            && (new Date(t.date).valueOf() <= this.toDateD.valueOf()));
        });
      }
      DD.transactions.forEach((e) => {
        if (e.shortDate) delete e.shortDate;
        if (e.formattedAmount) delete e.formattedAmount;
        if (e.reconciledIcon) delete e.reconciledIcon;
      });
    }

    // output
    var b: string = "";
    var content: string = "";

    if (this.format === 'json') {
      content = JSON.stringify(DD);
      console.log(DL);
    } else {
      // csv
      var DL: string[] = [];
      // "download" section
      DL = [];
      // DL.push('"business", "download dates", "including"');
      b = '"' + DD.business + '","' +
        ((this.timeframe === 'all') ? 'all dates' : DD.download.dates.fromDate + ' - ' + DD.download.dates.toDate) + '","';
      DD.download.including.forEach((e) => {
        b = b + e + '","'
      });
      b = b.slice(0, -2);
      DL.push(b);
      // clients section
      if (this.includeClients) {
        DL.push('Clients');
        // DL.push('"name","address_label","street1","street2","city","state","zip"');
        DD.clients.forEach(c => {
          b = '"' + c.name + '","' +
            c.address.label + '","' + c.address.street1 + '","' + c.address.street2 + '","' + c.address.city + '","' + c.address.zip + '"'
          DL.push(b);
          if (c.contacts.length > 0) {
            c.contacts.forEach(e => {
              // b = '"contact",' + e.type + '","' + e.label + '","' + e.contact + '"';
              b = '"' + e.label + '","' + e.contact + '"';
              DL.push(b);
            });
          }
        });
      }
      // appointments section
      if (this.includeAppts) {
        DL.push('Appointments');
        DL.push('"id","client","start","end","service","status","revenue","paid","subjective","objective","assessment","plan"');
        DD.appointments.forEach(a => {
          b = '"' + a.id + '","' +
            a.clientName + '","' + a.start + '","' + a.end + '","' + a.serviceDescription + '","' + a.completionState + '",' + a.revenue + ',"' + a.pd + '","' +
            ((a.visitNote.subjective) ? a.visitNote.subjective : '') + '","' +
            ((a.visitNote.objective) ? a.visitNote.objective : '') + '","' +
            ((a.visitNote.assessment) ? a.visitNote.assessment : '') + '","' +
            ((a.visitNote.plan) ? a.visitNote.plan : '') + '"';
          DL.push(b);
        });
      }
      if (this.includeTransactions) {
        DL.push('Transactions');
        DL.push('"id","appointment_id","client","date","type","description","amount","reconciled","processor_id"');
        DD.transactions.forEach(t => {
          b = '"' + t.uniqueId + '","' +
            t.apptId + '","' + t.clientName + '","' + t.date + '","' + t.type + '","' + t.description + '",' + t.amount + ',"' + t.reconciled + '","' +
            ((t.processorId) ? t.processorId : '') + '"';
          DL.push(b);
        });
      }
      content = DL.join('\n');
      // console.log(content);
    }

    // download data =====
    // create file locally on server
    const sourceFilePath = '/userdownloads/';  // TODO remember to make this dir & chmod
    const fd = new Date();
    var sourceFileName = 'MTAdata' + fd.getMonth().toString() + fd.getDate().toString() + fd.getFullYear().toString();
    sourceFileName = (this.format === 'csv') ? sourceFileName + '.csv' : sourceFileName + '.json';
    const sourceFullPath = sourceFilePath + sourceFileName;

    // file to write on target 
    var destinationFullPath = "";
    if (this.plt.is('mobile')) {
      this.helper.signal('in mobile section');
      // mobile
      // if (this.plt.is('ios')) {
        // destinationFullPath = window.rresolveLocalFileSystemURL(this.file.documentsDirectory + sourceFileName); 
        destinationFullPath = this.file.documentsDirectory + sourceFileName;  // verify we can see these docs
      // } else if (this.plt.is('android')) {
        // destinationFullPath = this.file.externalDataDirectory + sourceFileName;
      // }
      this.helper.signal('destination', destinationFullPath);
      this.file.writeFile(sourceFilePath, sourceFileName, content, {})
      .then((d) => {
        if (d) this.helper.signal('wrote file successfully');
          // download
          // const ft: FileTransferObject = this.trans.create();
          // ft.download(sourceFullPath, destinationFullPath, true)
          //   .then((entry) => {
          //     this.helper.signal('download complete: ' + entry.toURL());
          //     // remove the server copy of the file
          //     this.file.removeFile(sourceFilePath, sourceFileName)
          //       .then((d) => this.helper.signal('download file deleted on server'))
          //       .catch(error => this.helper.signal('download file delete error', error));
          //   })
          //   .catch(error => {
          //     this.helper.signal('transfer download error', error);
          //   });
        })
        .catch(error => {  // writefile
          this.helper.signal('writeFile error', error);
        });


    } else if (this.plt.is('core')) {
    // browser--create a "download" link and "click" it
    // destinationFullPath = 'Downloads/'+ sourceFileName;
    destinationFullPath = sourceFileName;
    this.helper.signal('destination', destinationFullPath);
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, destinationFullPath);
    } else {
      this.helper.signal('in link section');
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', destinationFullPath);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    } // else??


    // when complete, go back
    this.navCtrl.pop();
  }
}


// var destinationFullPath = "";
// if (this.plt.is('mobile')) {
//   this.helper.signal('in mobile section');
//   // mobile
//   if (this.plt.is('ios')) {
//     // destinationFullPath = window.rresolveLocalFileSystemURL(this.file.documentsDirectory + sourceFileName); 
//     destinationFullPath = this.file.documentsDirectory + sourceFileName;  // verify we can see these docs
//   } else if (this.plt.is('android')) {
//     destinationFullPath = this.file.externalDataDirectory + sourceFileName;
//   }
//   this.helper.signal('destination', destinationFullPath);
//   this.file.writeFile(sourceFilePath, sourceFileName, content, {})
//     .then((d) => {
//       if (d) this.helper.signal('wrote file successfully');
//       // download
//       const ft: FileTransferObject = this.trans.create();
//       ft.download(sourceFullPath, destinationFullPath, true)
//         .then((entry) => {
//           this.helper.signal('download complete: ' + entry.toURL());
//           // remove the server copy of the file
//           this.file.removeFile(sourceFilePath, sourceFileName)
//             .then((d) => this.helper.signal('download file deleted on server'))
//             .catch(error => this.helper.signal('download file delete error', error));
//         })
//         .catch(error => {
//           this.helper.signal('transfer download error', error);
//         });
//     })
//     .catch(error => {  // writefile
//       this.helper.signal('writeFile error', error);
//     });