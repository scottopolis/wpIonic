import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostListPage } from './post-list';

@NgModule({
  declarations: [
    PostListPage,
  ],
  imports: [
    IonicPageModule.forChild(PostListPage),
  ],
  exports: [
    PostListPage
  ]
})
export class PostListPageModule {}
