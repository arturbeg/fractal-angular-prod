// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule }    			from '@angular/forms';
// Components
import { ProfileComponent }		from './profile/profile.component';
import { UserCardComponent }    from './user-card/user-card.component';


// Service
//import { ChatService } 			from './chat.service';
// Routing
//import { ChatRoutingModule }	from './chat-routing.module';
// External Components used by this module (import app module now because it has chat-card)
//import { AppModule }            from '../app.module';
import { MaterialModule }          from '../material.module';
import { ProfileRoutingModule }    from './profile-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProfileRoutingModule
  ],
  declarations: [
     ProfileComponent,
     UserCardComponent,
     LoginComponent,
     SignupComponent,
     ChangePasswordComponent

  ],
  providers: [ ], // add later

  exports: [
      // add later
    ],
})
export class ProfileModule {}