import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { Configure } from '../../providers/configure/configure';

@IonicPage()
@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html',
})
export class PostListPage {

	items: any;
	page: number = 1;
	route: string;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public postService: PostsProvider,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public configure: Configure
		) {

		let url = configure.getUrl()

		// put your desired WP-API route here. URL params, CPTs, and custom routes all OK
		this.route = url + 'wp-json/wp/v2/posts'
	}

	ionViewDidLoad() {
		this.loadPosts()
	}

	loadPosts() {

		let loading = this.loadingCtrl.create({
		    showBackdrop: false,
		    //dismissOnPageChange: true
		});

		loading.present(loading);

		this.page = 1;

		// any menu imported from WP has to use same component. Other pages can be added manually with different components
		this.postService.load( this.route, this.page ).then(items => {

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

		this.navCtrl.push('PostDetailPage', {
		  item: item
		}, opt);
	}

	doRefresh(refresh) {
		this.loadPosts();
		// refresh.complete should happen when posts are loaded, not timeout
		setTimeout( ()=> refresh.complete(), 500);
	}

	loadMore(infiniteScroll) {

		this.page++;

		this.postService.load( this.route, this.page ).then(items => {
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

}
