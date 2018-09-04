
import { TopicService } from './topic.service';
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

import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { Topic } from './chat';


// provide MyClass like providers: [MyClass] in a component or NgModule.


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProfileModule,
    ChatRoutingModule,
    //SharedModule,
    NgxAutoScrollModule
  ],
  declarations: [
    MessageComponent,
    ChatCardComponent,
    ChatComponent,
    EditTopicModalComponent
  ],
  providers: [ SocketService, MessageService, ChatService, Topic, TopicService ],

  exports: [
      // add later
      ChatCardComponent,
    ],

    entryComponents: [ 
      
      EditTopicModalComponent 

    ]
})
export class ChatModule {}