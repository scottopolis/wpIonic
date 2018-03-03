import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController, Slides } from 'ionic-angular';
import { WooProvider } from '../../providers/woo/woo';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

	@ViewChild(Slides) slides: Slides;

	order: any = {
		billing: Object
	}
	spinner: any
	cart_contents: any
	gateways: any
	shipping_methods: any
	isLastSlide: boolean = false

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public wooProvider: WooProvider,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		public storage: Storage,
		public toastCtrl: ToastController
		) {

		this.storage.get( 'cart' ).then( data => {

			if( !data )
				this.presentToast( 'No cart items.' );

			console.log('cart', data)

			this.cart_contents = data

		})

		this.getGateways()
		this.getShipping()

	}

	getGateways() {

		this.wooProvider.get( '/wp-json/wc/v2/payment_gateways', null ).then( response => {
			console.log(response)
			this.gateways = []
			for (var i = 0; i < (<any>response).length; ++i) {
				if( response[i].enabled ) {
					this.gateways.push( response[i] )
				}
			}
		})

	}

	getShipping() {

		this.wooProvider.get( '/wp-json/wc/v2/shipping_methods', null ).then( response => {
			console.log(response)
			this.shipping_methods = response
		})

	}

	doCheckout( data ) {

		console.log(data.value)
		let order = data.value
		
		if( !order ) {
			this.presentToast( 'No order data submitted.' );
			return;
		}

		if( !this.cart_contents ) {
			this.presentToast( 'No cart items.' );
			return;
		}

		if( order.billing.billing_shipping_same === false ) {
			// fill shipping address
		} else {
			order.shipping = order.billing
			console.log('shipping', order.shipping)
		}

		if( order.shipping_lines ) {

			switch( order.shipping_lines.method_id ) {
				case 'flat_rate':
					order.shipping_lines.method_title = 'Flat Rate'
					order.shipping_lines.total = '10'
				break;
			}

		}

		order.shipping_lines = [order.shipping_lines]

		order.line_items = []

		for (var i = 0; i < this.cart_contents.length; ++i) {
			order.line_items[i] = {
				product_id: this.cart_contents[i].id,
				variation_id: this.cart_contents[i].variation_id,
				quantity: parseInt( this.cart_contents[i].quantity )
			}
		}

		console.log(order)

		order.set_paid = true;

		this.showSpinner()

		this.wooProvider.order( order ).then( response => {

			console.log(response)
			this.hideSpinner()
			this.presentToast( 'Thank you for your order!' );

			this.storage.remove( 'cart' )

			let opt = {};

			this.navCtrl.push('AccountPage', {
			  receipt: response
			}, opt);

		}, (err) => {

		this.hideSpinner()
		console.log(err)

		}).catch( e => {
			console.warn(e)
			this.hideSpinner()
			this.presentToast( 'There was a problem connecting to the server.' );
		})

		// make sure spinner disappears even if there's a problem
		setTimeout( () => {
			this.hideSpinner();
		}, 5000 );

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	showSpinner() {
		this.spinner = this.loadingCtrl.create();

		this.spinner.present();
	}

	hideSpinner() {
		this.spinner.dismiss();
	}

	presentToast(msg) {

	    let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 5000,
	      position: 'bottom'
	    });

	    toast.present();

	}

	nextSlide() {
		this.slides.slideNext()
	}

	prevSlide() {
		this.slides.slidePrev()
	}

	slideChanged() {
		if( this.slides.isEnd() ) {
			this.isLastSlide = true
		} else {
			this.isLastSlide = false
		}
	}

}
