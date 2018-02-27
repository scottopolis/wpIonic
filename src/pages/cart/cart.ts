import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

	items: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public storage: Storage,
		public viewCtrl: ViewController
		) {


	}

	ionViewDidLoad() {

		this.getCartItems()
		
	}

	getCartItems() {

		this.storage.get( 'cart' ).then( data => {

			this.items = data

		})

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
