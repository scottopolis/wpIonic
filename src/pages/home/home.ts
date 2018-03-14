import { Component } from '@angular/core';
import { NavController, ModalController, Events, IonicPage } from 'ionic-angular';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginModal: any;
  loggedin: boolean = false

  constructor(
  	public navCtrl: NavController,
  	public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events
  	) {

  	console.log('home page')

    events.subscribe('user:login', data => {
      this.setLoginData(data);
    });

  }

  ionViewDidEnter() {

    this.storage.get('user_login').then( data => {
      if( data ) {
        // do checks here
        this.loggedin = true
      } else {
        this.loggedin = false
      }
    })

  	
  }

  pushPage(page) {

    this.navCtrl.push( page );
    
  }

  openLoginModal() {

    this.loginModal = this.modalCtrl.create( 'LoginModalPage' );
    
    this.loginModal.present();

  }

  setLoginData( data ) {

    if( data.logout ) {
      this.loggedin = false
    } else if( data.success ) {
      this.loggedin = true
    }

  }

}