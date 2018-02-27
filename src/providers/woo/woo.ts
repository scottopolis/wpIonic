import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WooProvider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WooProvider {

  data: any = null;
  url: string = 'https://appdev.local/';

  constructor(public http: HttpClient) {

  }

  /* Returns promise.
   * Usage: 
   */
  get( route, page ) {

    return new Promise( (resolve, reject) => {

      if( !route )
        reject({ data: { message: "No URL set. " } })

      // set pagination
      if( !page ) {
        let page = '1';
      }

      var concat;

      // check if url already has a query param
      if( route.indexOf('?') > 0 ) {
        concat = '&';
      } else {
        concat = '?';
      }

      let url = this.url + route + concat + 'page=' + page;

      // Basic auth requires base64 encoded string of 'Basic ' + btoa('key:secret')

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic Y2tfOTQ5Yzg2OWJiMDAzZGYzOGMxZmY1YzQyMTE2YTFjODRmMDU4NmUzYzpjc184NjQ1NmQ4ODA4MzJjNzYwNmQyM2MzOWMxYTBlNjJjZDI5YWUzYTli'
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
          console.log(error)
        })

    }); // end Promise
    
  }

  handleError(err) {
    console.warn(err);
  }

}