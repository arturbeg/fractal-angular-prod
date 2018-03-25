import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { ChatComponent } from './chat/chat.component';
import { ChatgroupComponent } from './chatgroup/chatgroup.component';

// Needed for animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// Importing NgBootstrap's main module

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { ChatCardComponent } from './chat-card/chat-card.component';

// Material related components

import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';


import {MatIconModule} from '@angular/material/icon';

import {MatMenuModule} from '@angular/material/menu';

import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';

import {MatTabsModule} from '@angular/material/tabs';


import { AppRoutingModule } from './/app-routing.module';
import { MessageComponent } from './message/message.component';
import { PostComponent } from './post/post.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { ResultsComponent } from './results/results.component';
import { ChatgroupCardComponent } from './chatgroup-card/chatgroup-card.component';
import { UserCardComponent } from './user-card/user-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    RecentActivityComponent,
    ChatComponent,
    ChatgroupComponent,
    ChatCardComponent,
    MessageComponent,
    PostComponent,
    PostCommentComponent,
    ResultsComponent,
    ChatgroupCardComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    
    // Material related imports
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,


    AppRoutingModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
