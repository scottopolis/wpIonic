import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { WooProvider } from '../../providers/woo/woo';

@IonicPage()
@Component({
  selector: 'page-woo-detail',
  templateUrl: 'woo-detail.html',
})
export class WooDetailPage {

	selectedItem: any;
	description: any;
	cartModal: any;
	variations: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public sanitizer: DomSanitizer,
		public storage: Storage,
		public toastCtrl: ToastController,
		public modalCtrl: ModalController,
		public wooProvider: WooProvider
		) {

		this.loadProduct()

	}

	loadProduct() {

		this.selectedItem = this.navParams.get('item');

		if( this.selectedItem.description ) {
		  this.description = this.sanitizer.bypassSecurityTrustHtml( this.selectedItem.description );
		} else {
			this.description = '';
		}

		this.getVariations()

	}

	addToCart(form) {

		let item = form.value

		item.name = this.selectedItem.name
		item.product_id = this.selectedItem.id
		item.price = this.selectedItem.price
		item.quantity = ( item.quantity ? item.quantity : 1 )

		console.log(item)

		this.storage.get( 'cart' ).then( data => {

			if( data ) {
				data.push(item)
			} else {
				data = [item]
			}

			console.log(data)

			this.storage.set( 'cart', data )

			this.presentToast( item.name + ' added to cart!')

		})

	}

	getVariations() {

		this.wooProvider.get( 'wp-json/wc/v2/products/' + this.selectedItem.id + '/variations', 'nopaging' ).then(variations => {
			this.variations = variations
		})

	}

	presentToast(msg) {

		let toast = this.toastCtrl.create({
		  message: msg,
		  duration: 3000,
		  position: 'bottom',
		  cssClass: 'normal-toast'
		});

		toast.present();

	}

	showCart() {

	    this.cartModal = this.modalCtrl.create( 'CartPage' );
	    
	    this.cartModal.present();

	}

}
