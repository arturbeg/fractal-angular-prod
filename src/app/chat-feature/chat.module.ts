// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule }    			from '@angular/forms';
// Components
import { MessageComponent }		from './message/message.component';
import { ChatCardComponent }    from './chat-card/chat-card.component';
import { ChatComponent }    from './chat/chat.component';

// Service
//import { ChatService } 			from './chat.service';
// Routing
//import { ChatRoutingModule }	from './chat-routing.module';
// External Components used by this module (import app module now because it has chat-card)
//import { AppModule }            from '../app.module';
import { MaterialModule }          from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //ChatRoutingModule,
    MaterialModule
  ],
  declarations: [
    MessageComponent,
    ChatCardComponent,
    ChatComponent
  ],
  providers: [ ], // add later

  exports: [

      // add later
    ],
})
export class ChatModule {}