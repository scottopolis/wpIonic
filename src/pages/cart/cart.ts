import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

	items: any;
	cart_total: number;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public storage: Storage,
		public viewCtrl: ViewController,
		public events: Events
		) {


	}

	ionViewDidLoad() {

		this.getCartItems()
		
	}

	getCartItems() {

		this.storage.get( 'cart' ).then( data => {

			if( !data )
				return;

			this.items = data

			for (var i = 0; i < data.length; ++i) {
				let total = parseInt( data[i].price ) * parseInt( data[i].quantity )
				this.cart_total = ( this.cart_total ? this.cart_total : 0 ) + total
			}

		})

	}

	clearCart() {

		this.storage.remove( 'cart' )

		this.items = []

		this.cart_total = 0

		this.events.publish( 'clear_cart', 0 )

	}

	goCheckout() {

		this.navCtrl.push('CheckoutPage');
		this.dismiss()

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}