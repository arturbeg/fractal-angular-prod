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

@NgModule({
  imports: [
    //AppModule,
    CommonModule,
    FormsModule,
    ChatGroupRoutingModule,
    MaterialModule
  ],
  declarations: [
    ChatGroupComponent,
    ChatGroupCardComponent
  ],
  providers: [ ChatGroupService ],

  exports: [
  	ChatGroupComponent,
    ChatGroupCardComponent
    ],
})
export class ChatGroupModule {}