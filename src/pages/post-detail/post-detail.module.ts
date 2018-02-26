import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDetailPage } from './post-detail';

@NgModule({
  declarations: [
    PostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDetailPage),
  ],
  exports: [
    PostDetailPage
  ]
})
export class PostDetailPageModule {}
