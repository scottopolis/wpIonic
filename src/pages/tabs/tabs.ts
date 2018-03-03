import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'PostListPage';
  tab3Root = 'WooListPage';
  tab4Root = ContactPage;

  constructor() {

  }
}
