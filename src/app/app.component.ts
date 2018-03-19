import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  menus: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public menu: MenuController,
    public modalCtrl: ModalController
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.doMenus()
    });
  }

  doMenus() {

    this.menus = [{ title: 'Home', slug: 'HomePage', icon: 'home' },{ title: 'Shop', slug: 'WooListPage', icon: 'basket' },{ title: 'Posts', slug: 'PostListPage', icon: 'list' },{ title: 'Contact', slug: 'ContactPage', icon: 'mail' }]

    this.nav.setRoot( TabsPage )
  }

  menuLink( item ) {

    this.menu.close();

    this.nav.setRoot( item.slug );

  }

  openLoginModal() {

    let loginModal = this.modalCtrl.create( 'LoginModalPage' );
    
    loginModal.present();

  }
}
