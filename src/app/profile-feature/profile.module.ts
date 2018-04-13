// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
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
import { UserService } from './profile.service'
import { ChatGroupModule } from '../chatgroup-feature/chatgroup.module';
import { ProfileModalComponent } from './profile-modal/profile-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProfileRoutingModule,
    ChatGroupModule
  ],
  declarations: [
     ProfileComponent,
     ProfileModalComponent,
     UserCardComponent,
     LoginComponent,
     SignupComponent,
     ChangePasswordComponent,
     

  ],
  providers: [ UserService ],

  exports: [
      // add later
    ],

  entryComponents: [ ProfileModalComponent ]  
})
export class ProfileModule {}