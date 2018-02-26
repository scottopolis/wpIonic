import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Posts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostsProvider {
  data: any = null;

  constructor(
    public http: HttpClient
    ) {}

  load(url:string, page) {

    // set pagination
    if( !page ) {
      let page = '1';
    }

    return new Promise( (resolve, reject) => {

		var concat;

		// check if url already has a query param
		if( url.indexOf('?') > 0 ) {
			concat = '&';
		} else {
			concat = '?';
		}

		this.http.get( url + concat + 'page=' + page )
		    .subscribe(data => {

		      this.data = data;

		      resolve(this.data);
		    },
		    error => {
		      // probably a bad url or 404
		      reject(error);
		    })
	});

  }

}