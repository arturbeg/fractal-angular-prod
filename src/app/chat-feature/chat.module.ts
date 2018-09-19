import { SocketIoClientModule } from './../socket-io-client/socket-io-client.module';
import { MessageNonHttpService } from './message-non-http.service';
import { SnackBar } from './message/snack-bar';
import { TopicService } from './topic.service';
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule, ReactiveFormsModule }    			from '@angular/forms';
import { MessageComponent }		from './message/message.component';
import { ChatCardComponent }    from './chat-card/chat-card.component';
import { ChatComponent }    from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module'
import { MaterialModule }          from '../material.module';
import { MessageService } from './message.service'
import { ChatService } from './chat.service';
import { EditTopicModalComponent } from './edit-topic-modal/edit-topic-modal.component'
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { NewTopicComponent } from './new-topic/new-topic.component';
import { LinkyModule } from 'angular-linky';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ChatRoutingModule,
    NgxAutoScrollModule,
    LinkyModule,
    InfiniteScrollModule,
    SocketIoClientModule
  ],
  declarations: [
    MessageComponent,
    ChatCardComponent,
    ChatComponent,
    EditTopicModalComponent,
    SnackBar,
    NewTopicComponent
  ],
  providers: [ MessageService, ChatService, TopicService, MessageNonHttpService ],

  exports: [
      // add later
      ChatCardComponent,
  ],

    entryComponents: [ 
      
      EditTopicModalComponent,
      SnackBar,
      NewTopicComponent

    ]
})
export class ChatModule {}