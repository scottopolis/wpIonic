import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController, Events } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {

	login:any = {}
	spinner: any;
	loggedin: boolean = false

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		private loginProvider: LoginProvider,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		public storage: Storage,
		public events: Events
		) {
	}

	ionViewDidLoad() {
		this.start()
	}

	start() {

		this.storage.get('user_login').then( data => {
		  if( data ) {
		    // do checks here
		    this.loggedin = true
		  } else {
		    this.loggedin = false
		  }
		})

	}

	doLogin() {

		if( !this.login )
			this.presentToast( 'Please enter a valid login.' );

		this.showSpinner()

		this.loginProvider.login( this.login ).then( response => {

			if( !response || (<any>response).success === false ) {
				this.loginErr( response )
				return;
			}

			let login_data = (<any>response).data;

			console.log( login_data )

			this.presentToast( login_data.message );
			this.events.publish('user:login', login_data )
			this.storage.set( 'user_login', login_data )
			this.dismiss()

			this.hideSpinner()

		}, (err) => {

			this.hideSpinner()
			this.loginErr(err)

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

	doLogout() {

		this.showSpinner()

		this.loginProvider.login( {}, true ).then( response => {

			if( !response || (<any>response).success === false ) {
				this.loginErr( response )
				return;
			}

			let login_data = (<any>response).data;

			console.log( login_data )

			this.presentToast( login_data.message )
			this.events.publish('user:login', login_data )
			this.storage.remove( 'user_login' )
			this.dismiss()

			this.hideSpinner()

		}, (err) => {

			this.hideSpinner()
			this.loginErr(err)

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

	loginErr( err ) {

		console.log(err)

		this.hideSpinner()

		this.presentToast( err.data.message );

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

		console.log(msg)

	    let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 5000,
	      position: 'bottom'
	    });

	    toast.present();

	}

}
