import { Injectable } from '@angular/core';
import { LocalStoreProvider } from '../local-store/local-store';

import CryptoJS from 'crypto-js';

let ENCRYPT_KEY = 'And having perhaps the better claim, Because it was grassy and wanted wear,'  // robert frost, the road not taken
// TODO:  cache uses passed-in key for encryption

@Injectable()
export class CacheProvider {

  constructor(
    private LSP: LocalStoreProvider) {
    console.log('Constructor Cache Provider');
  }

  remove(type) {
    console.log('removing from cache', type);
    this.LSP.remove(type);
  }

  clearCache() {
    console.log('clearing cache');
    this.LSP.keys()
      .then((k) => {
        for (const t in k) {
          if (k.hasOwnProperty(t)) {
            // remove everything except session and plans
            // if (k[t] !== "mta_session"
            //   && k[t] !== "plans") {
            console.log('clearing ', k[t]);
            this.LSP.remove(k[t]);
            // } else {
            //   console.log('not clearing ', k[t]);
            // }
          }
        }
      });
  }

  write(type: string, input: string) {
    console.log('caching ' + type);
    let p = this.encrypt(this.package(type, input), ENCRYPT_KEY);
    this.LSP.set(type, p)
      .then(result => console.log("saved to cache"))
      .catch(e => console.log("error: " + e));
  }


  read(type: string): Promise<string> {
    console.log('reading cache for ' + type);
    return new Promise((resolve, reject) => {
      this.LSP.get(type)
        .then((data) => {
          if (data) {
            console.log('got cache');
            const r = this.unPackage(type, this.decrypt(data, ENCRYPT_KEY));
            resolve(r);
          } else {
            console.log('not in cache');
            reject('not in cache');
          }
        });
      // .catch(e => reject => console.log("error: " + e));
    })
  }

  package(type: string, input: string): string {
    // { type: { cached: '1/1/1', contents: { input } } }
    let p: object = {};
    p[type] = {
      cached: Date.now().valueOf(),
      contents: input
    }
    return JSON.stringify(p);
  }

  unPackage(type: string, input: string): string {
    // strip off container and date
    // { type: { cached: '1/1/1', contents: { input } } }
    const p = JSON.parse(input);
    return p[type].contents;
  }

  encrypt(data: string, key: string): string {
    // console.log("encrypting");
    // console.log("key", key);
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  decrypt(data: string, key: string): string {
    // console.log('decrypting');
    // console.log("key", key);
    const bytes = CryptoJS.AES.decrypt(data, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
