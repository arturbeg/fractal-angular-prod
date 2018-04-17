import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material + animations
import { MaterialModule }          from './material.module';
import {BrowserAnimationsModule}   from '@angular/platform-browser/animations';

// Importing NgBootstrap's main module
import {NgbModule}                  from '@ng-bootstrap/ng-bootstrap';


import { ChatGroupModule }          from './chatgroup-feature/chatgroup.module';
import { ChatModule }               from './chat-feature/chat.module';
import { PostModule }               from './post-feature/post.module';
import { ProfileModule }            from './profile-feature/profile.module';


import { HttpClientModule }         from '@angular/common/http';

import { HttpErrorHandler }         from './http-error-handler.service' 

import { MessageService }           from './message.service' 

import { httpInterceptorProviders } from './http-interceptors/index';

import { AuthService }          from './auth.service';

import { SharedModule } from './shared/shared.module'

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule,
    HttpModule,
    SharedModule
  ],

  exports: [
  ],

  providers: [AuthService,
              HttpErrorHandler,
              MessageService,
              httpInterceptorProviders,
              ],
  bootstrap: [AppComponent],

  entryComponents: [],
})
export class AppModule { }
