import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThanksPage } from './thank-you';

@NgModule({
  declarations: [
    ThanksPage,
  ],
  imports: [
    IonicPageModule.forChild(ThanksPage),
  ],
})
export class ThanksPageModule {}
