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



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedRoutingModule,
    ChatModule
  ],
  declarations: [

    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResultsComponent,
    ActivityComponent

  ],
  providers: [ChatService],

  exports: [
      HeaderComponent
    ],

  entryComponents: []  
})
export class SharedModule {}