import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent }        from './results/results.component';


//import { ProfileComponent }        from './profile/profile.component';
//import { RecentActivityComponent } from './recent-activity/recent-activity.component';
//import { ChatComponent }           from './chat/chat.component';
//import { ChatgroupComponent } from './chatgroup/chatgroup.component';
//import { ChatCardComponent }       from './chat-card/chat-card.component';
//import { MessageComponent }        from './message/message.component';
//import { PostComponent }           from './post/post.component';
// import { PostCommentComponent }    from './post-comment/post-comment.component';

//import { ChatgroupCardComponent } from './chatgroup-card/chatgroup-card.component';
// import { UserCardComponent }       from './user-card/user-card.component';

// Material + animations
import { MaterialModule }          from './material.module';
import {BrowserAnimationsModule}   from '@angular/platform-browser/animations';

// Importing NgBootstrap's main module
import {NgbModule}                  from '@ng-bootstrap/ng-bootstrap';

import { PageNotFoundComponent }    from './not-found/not-found.component';

import { ChatGroupModule }          from './chatgroup-feature/chatgroup.module';
import { ChatModule }               from './chat-feature/chat.module';
import { PostModule }               from './post-feature/post.module';
import { ProfileModule }            from './profile-feature/profile.module';


import { HttpClientModule }         from '@angular/common/http';

import { HttpErrorHandler }         from './http-error-handler.service' 

import { MessageService }           from './message.service' 

import { httpInterceptorProviders } from './http-interceptors/index';

import { AuthService }          from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ResultsComponent,
    PageNotFoundComponent 
  ],
  imports: [
    ChatGroupModule,
    ChatModule,
    PostModule,
    ProfileModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],

  exports: [
  ],

  providers: [AuthService,
              HttpErrorHandler,
              MessageService,
              httpInterceptorProviders,
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
