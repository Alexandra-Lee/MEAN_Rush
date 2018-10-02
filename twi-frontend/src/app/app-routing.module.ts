import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashtagComponent } from './hashtag/hashtag.component';
// import { MessageComponent } from './message/message.component';
// import { CommentComponent } from './comment/comment.component';
const routes: Routes = [
  { path: 'hashtag', component: HashtagComponent }
  // { path: 'message', component: MessageComponent },
  // { path: 'comment', component: CommentComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
