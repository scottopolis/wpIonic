import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WooListPage } from './woo-list';

@NgModule({
  declarations: [
    WooListPage,
  ],
  imports: [
    IonicPageModule.forChild(WooListPage),
  ],
})
export class WooListPageModule {}
