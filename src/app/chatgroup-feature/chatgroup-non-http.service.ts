import { Topic } from './../chat-feature/chat';
import { ChatGroupService } from './chatgroup.service';
import { Injectable } from '@angular/core';


@Injectable()
export class ChatgroupNonHttpService {

  // topics: Topic[]
  
  constructor(
    private chatgroupService: ChatGroupService
  ) { }

  follow(label) {
    this.chatgroupService.followChatGroup(label).subscribe(
      data => {
        console.log(data)
      }
    )
  }



}
