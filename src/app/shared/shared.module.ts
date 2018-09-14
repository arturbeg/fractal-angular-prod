import { ChatGroupModule } from './../chatgroup-feature/chatgroup.module';
import { ProfileModule } from './../profile-feature/profile.module';
import { RouterModule } from '@angular/router';
import { PostModule } from './../post-feature/post.module';
import { ChatService } from './../chat-feature/chat.service';
import { Topic } from './../chat-feature/chat';
// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { MaterialModule }          from '../material.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';
import { SharedRoutingModule } from './shared-routing.module'
import { ChatModule } from '../chat-feature/chat.module';
import { ActivityComponent } from './activity/activity.component';
import { NewRootTopicComponent } from './new-root-topic/new-root-topic.component';
// import { NewTopicComponent } from './new-topic/new-topic.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedRoutingModule,
    ChatModule,
    PostModule,
    RouterModule,
    ProfileModule,
    ChatGroupModule
  ],
  declarations: [

    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResultsComponent,
    ActivityComponent,
    NewRootTopicComponent,
    // NewTopicComponent

  ],
  providers: [ChatService],

  exports: [
      HeaderComponent
    ],

  entryComponents: []  
})
export class SharedModule {}