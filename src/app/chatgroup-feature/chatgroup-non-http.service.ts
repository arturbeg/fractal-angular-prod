import { Topic } from './../chat-feature/chat';
import { ChatGroupService } from './chatgroup.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ChatGroup } from './chatgroup';


@Injectable()
export class ChatgroupNonHttpService {

  // topics: Topic[]
  chatgroup: Subject<ChatGroup> = new Subject<ChatGroup>()

  
  constructor(
    public chatgroupService: ChatGroupService
  ) { }

  follow(label) {
    this.chatgroupService.followChatGroup(label).subscribe(
      data => {
        console.log(data);
        this.chatgroup.next(data);
      }
    )
  }



}
