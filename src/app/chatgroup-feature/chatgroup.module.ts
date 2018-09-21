import { PipesCommonModule } from './../pipes/pipes-common/pipes-common.module';
import { ProfileModule } from './../profile-feature/profile.module';
import { ChatModule } from './../chat-feature/chat.module';
import { ChatgroupNonHttpService } from './chatgroup-non-http.service';
// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule }    			from '@angular/forms';
// Components
import { ChatGroupComponent }		from './chatgroup/chatgroup.component';
import { ChatGroupCardComponent }	from './chatgroup-card/chatgroup-card.component';
// Service
import { ChatGroupService }			from './chatgroup.service';
// Routing
import { ChatGroupRoutingModule }	from './chatgroup-routing.module';
// External Components used by this module (import app module now because it has chat-card)
//import { AppModule }            from '../app.module';
import { MaterialModule }          from '../material.module';
import { FollowersModalComponent } from './followers-modal/followers-modal.component';
import { ChatgroupNotificationsComponent } from './chatgroup-notifications/chatgroup-notifications.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatGroupRoutingModule,
    MaterialModule,
    ChatModule,
    ProfileModule,
    PipesCommonModule
  ],
  declarations: [
    ChatGroupComponent,
    ChatGroupCardComponent,
    FollowersModalComponent,
    ChatgroupNotificationsComponent
  ],
  providers: [ ChatGroupService, ChatgroupNonHttpService ],

  exports: [
  	ChatGroupComponent,
    ChatGroupCardComponent
    ],

  entryComponents: [FollowersModalComponent]  
})
export class ChatGroupModule {}