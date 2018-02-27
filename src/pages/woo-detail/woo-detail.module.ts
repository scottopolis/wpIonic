import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WooDetailPage } from './woo-detail';

@NgModule({
  declarations: [
    WooDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WooDetailPage),
  ],
})
export class WooDetailPageModule {}
