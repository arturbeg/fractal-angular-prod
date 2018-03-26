import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { ChatComponent } from './chat/chat.component';
import { ChatgroupComponent } from './chatgroup/chatgroup.component';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { MessageComponent } from './message/message.component';
import { PostComponent } from './post/post.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { ResultsComponent } from './results/results.component';
import { ChatgroupCardComponent } from './chatgroup-card/chatgroup-card.component';
import { UserCardComponent } from './user-card/user-card.component';

// Material + animations
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Importing NgBootstrap's main module
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
