import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule, ReactiveFormsModule }    			from '@angular/forms';

import { MessageComponent }		from './message/message.component';
import { ChatCardComponent }    from './chat-card/chat-card.component';
import { ChatComponent }    from './chat/chat.component';

import { ChatRoutingModule } from './chat-routing.module'
import { MaterialModule }          from '../material.module';
import { ProfileModule } from '../profile-feature/profile.module'
import { SharedModule } from '../shared/shared.module'
import { SocketService } from './socket.service'
import { MessageService } from './message.service'
import { ChatService } from './chat.service';
import { EditTopicModalComponent } from './edit-topic-modal/edit-topic-modal.component'
// import { ChatService } from './chat.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProfileModule,
    ChatRoutingModule,
    SharedModule
  ],
  declarations: [
    MessageComponent,
    ChatCardComponent,
    ChatComponent,
    EditTopicModalComponent
  ],
  providers: [ SocketService, MessageService, ChatService ],

  exports: [
      // add later
    ],

    entryComponents: [ 
      
      EditTopicModalComponent 

    ]
})
export class ChatModule {}