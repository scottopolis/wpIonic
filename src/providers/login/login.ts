import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Configure } from '../configure/configure';

@Injectable()
export class LoginProvider {

  data: any = null;
  url: string;

  constructor(
    public http: HttpClient,
    public configure: Configure ) {

    this.url = configure.getUrl()

  }

  /* Returns promise.
   * Usage: 
   */
  login( form: any, logout = null ) {

    return new Promise( (resolve, reject) => {

      if( !this.url )
        reject({ data: { message: "No URL set. " } })

      let url = this.url + 'wp-json/app/v1/login';

      var formData = new FormData();

      formData.append("username", form.user);
      formData.append("password", form.pass);
      formData.append("security", 'my-secure-phrase');

      if( logout ) {
        formData.append("logout", "true" );
      }

      var request = new XMLHttpRequest();
      request.open("POST", url);
      request.send(formData);
      request.onload = (e) => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(JSON.parse(request.responseText));
          } else {
            reject(JSON.parse(request.statusText));
          }
        }
      };

    });
    
  }

  handleError(err) {
    console.warn(err);
  }

}