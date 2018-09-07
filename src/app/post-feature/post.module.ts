// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule }    			from '@angular/forms';
// Components
import { PostComponent }		from './post/post.component';
import { PostCommentComponent }    from './post-comment/post-comment.component';
import { RecentActivityComponent }    from './recent-activity/recent-activity.component';

// Service
//import { ChatService } 			from './chat.service';
// Routing
//import { ChatRoutingModule }	from './chat-routing.module';
// External Components used by this module (import app module now because it has chat-card)
//import { AppModule }            from '../app.module';
import { MaterialModule }          from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    PostComponent,
    PostCommentComponent,
    RecentActivityComponent
  ],
  providers: [], // add later

  exports: [
      // add later
      PostComponent
    ],
})
export class PostModule {}