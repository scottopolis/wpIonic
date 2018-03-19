import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, Events } from 'ionic-angular';
import { WooProvider } from '../../providers/woo/woo';

@IonicPage()
@Component({
  selector: 'page-woo-list',
  templateUrl: 'woo-list.html',
})
export class WooListPage {

	items: any;
	page: number = 1;
	route: string;
	cartModal: any;
	cart_count: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public wooProvider: WooProvider,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public modalCtrl: ModalController,
		public events: Events
		) {

		this.route = 'wp-json/wc/v2/products'

		events.subscribe('add_to_cart', data => {
	      this.cart_count++
	    });

	    events.subscribe('clear_cart', data => {
	      this.cart_count = 0
	    });
	}

	ionViewDidLoad() {
		this.loadProducts()

		this.wooProvider.getCartContents().then( cart => {
			this.cart_count = ( cart ? (<any>cart).length : '' )
		})
		
	}

	loadProducts() {

		let loading = this.loadingCtrl.create({
		    showBackdrop: false,
		    //dismissOnPageChange: true
		});

		loading.present(loading);

		this.page = 1;

		// any menu imported from WP has to use same component. Other pages can be added manually with different components
		this.wooProvider.get( this.route, this.page ).then(items => {

		  console.log(items)

		  // Loads posts from WordPress API
		  this.items = items;

		  // load more right away
		  this.loadMore(null);
		  loading.dismiss();
		}).catch((err) => {

		  loading.dismiss();
		  console.error('Error getting posts', err);

		});

		// make sure spinner never gets stuck on
		setTimeout(() => {
		    loading.dismiss();
		}, 8000);

	}

	itemTapped(event, item) {

		let opt = {};

		this.navCtrl.push('WooDetailPage', {
		  item: item
		}, opt);
	}

	doRefresh(refresh) {
		this.loadProducts();
		// refresh.complete should happen when posts are loaded, not timeout
		setTimeout( ()=> refresh.complete(), 500);
	}

	loadMore(infiniteScroll) {

		this.page++;

		this.wooProvider.get( this.route, this.page ).then(items => {
		  // Loads posts from WordPress API
		  let length = items["length"];

		  if( length === 0 ) {
		    if(infiniteScroll)
		      infiniteScroll.complete();
		    return;
		  }

		  for (var i = 0; i < length; ++i) {
		    this.items.push( items[i] );
		  }

		  if(infiniteScroll)
		    infiniteScroll.complete();

		}).catch( e => {
		  // promise was rejected, usually a 404 or error response from API
		  if(infiniteScroll)
		    infiniteScroll.complete();

		  console.warn(e)

		});

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