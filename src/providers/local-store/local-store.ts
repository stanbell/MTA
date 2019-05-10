import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStoreProvider {

  constructor(private storage: Storage) {
    console.log('Constructor LocalStoreProvider Provider');
  }

  async set(key: string, value: string): Promise<any> {
    // return new Promise((resolve, reject) => {
      try {
        let result = await this.storage.set(key, value);
        return result;
      }
      catch (err) {
        console.log('storage set failed ', err);
      }
  }

  async get(key: string): Promise<any> {
    // return new Promise((resolve, reject) => {
      try {
        return await this.storage.get(key);
      }
      catch (err) {
        console.log('storage get failed ', err);
        return '';
      }
  }

  remove(key: string) {
    this.storage.remove(key);
  }

  clear() {
    this.storage.clear();
  }

  keys() {
    return new Promise((resolve, reject) => {
      this.storage.keys()
        .then(result => resolve(result))
        .catch((reason) => {
          console.info(reason);
          reject(reason);
        });
    })
  }
  
  // setObject(key: string, object: Object) {
  //   return this.storage.set(key, JSON.stringify(object)).then(result => {
  //     console.log("set Object in storage: " + result);
  //     return true;
  //   }).catch(function (reason) {
  //     console.info(reason);
  //     return false;
  //   });
  // }
    
  // getObject(key: string): Promise<any> {
  //   return this.storage.get(key).then(result => {
  //     if (result != null) { return JSON.parse(result) }
  //     return null;
  //   }).catch(function (reason) {
  //     console.info(reason);
  //     return null;
  //   });
  // }
  
}