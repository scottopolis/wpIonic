import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  selectedItem: any;
  content: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public sanitizer: DomSanitizer
  	) {

  	this.selectedItem = this.navParams.get('item');

    if( this.selectedItem.content.rendered ) {
      this.content = this.sanitizer.bypassSecurityTrustHtml( this.selectedItem.content.rendered );
    }

  }

  ionViewDidLoad() {

    
  }

}
