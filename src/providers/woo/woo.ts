import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the WooProvider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WooProvider {

  data: any = null;
  url: string = 'https://appdev.local/';

  constructor(
    public http: HttpClient,
    public storage: Storage
    ) {

  }

  /* Returns promise.
   * Usage: 
   */
  get( route, page ) {

    return new Promise( (resolve, reject) => {

      if( !route )
        reject({ data: { message: "No URL set. " } })

      var concat;

      // check if url already has a query param
      if( route.indexOf('?') > 0 ) {
        concat = '&';
      } else {
        concat = '?';
      }

      console.log('page ' + page)

      let url = this.url + route;

      // set pagination
      if( page === 'nopaging' ) {
        // don't add page
        url = url
      } else if( page ) {
        url = url + concat + 'page=' + page
      } else {
        url = url + concat + 'page=1'
      }

      console.log( 'url' + url)

      // Basic auth requires base64 encoded string of 'Basic ' + btoa('key:secret')

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic Y2tfZWUwMTBhOWQyOWYxN2Y5NjM4ZDViYjJhZWFhNDMyYzM4N2FmNTJiZTpjc18xMjM5MmYyYmVhMzlhYjZlYTM4NWExYWVmZWFjYzIyNDdkMTcxNjdm'
        })
      };

      this.http.get( url, httpOptions )
        .subscribe(data => {

          this.data = data;

          resolve(this.data);
        },
        error => {
          // probably a bad url or 404
          reject(error);
          this.handleError(error)
        })

    }); // end Promise
    
  }

  send( data, route ) {

    return new Promise( (resolve, reject) => {

      if( !data )
        reject({ data: { message: "No data." } })

      let url = this.url + route

      // Basic auth requires base64 encoded string of 'Basic ' + btoa('key:secret')

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic Y2tfZWUwMTBhOWQyOWYxN2Y5NjM4ZDViYjJhZWFhNDMyYzM4N2FmNTJiZTpjc18xMjM5MmYyYmVhMzlhYjZlYTM4NWExYWVmZWFjYzIyNDdkMTcxNjdm'
        })
      };

      this.http.post( url, data, httpOptions )
        .subscribe(data => {

          this.data = data;

          resolve(this.data);
        },
        error => {
          // probably a bad url or 404
          reject(error);
          this.handleError(error)
        })

    }); // end Promise

  }

  getCartContents() {

    return new Promise( (resolve, reject) => {

      this.storage.get( 'cart' ).then( data => {
        resolve( data )
      })

    })

  }

  handleError(err) {
    console.warn(err);
  }

}