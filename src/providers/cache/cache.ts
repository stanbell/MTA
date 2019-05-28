import { Injectable } from '@angular/core';
import { LocalStoreProvider } from '../local-store/local-store';
import { HelpersProvider } from '../helpers/helpers';


let ENCRYPT_KEY = 'And having perhaps the better claim, Because it was grassy and wanted wear,'  // robert frost, the road not taken
// TODO:  cache uses passed-in key for encryption

@Injectable()
export class CacheProvider {

  constructor(
    public helper: HelpersProvider,
    private LSP: LocalStoreProvider) {
    console.log('Constructor Cache Provider');
  }

  remove(type: string) {
    console.log('removing from cache', type);
    this.LSP.remove(type);
  }

  clearCache() {
    console.log('clearing cache');
    this.LSP.keys()
      .then((k) => {
        for (const t in k) {
          if (k.hasOwnProperty(t)) {
            // removes everybody's eveerything
            console.log('clearing ', k[t]);
            this.LSP.remove(k[t]);
          }
        }
      });
  }

  write(type: string, input: string) {
    console.log('caching ' + type);
    let p = this.helper.encrypt(this.package(type, input), ENCRYPT_KEY);
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
            const r = this.unPackage(type, this.helper.decrypt(data, ENCRYPT_KEY));
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
}
