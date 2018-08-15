import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TopicService {

  constructor(private chatService: ChatService) { }

  upvote(label) {

    this.chatService.upvoteTopic(label).subscribe(
      data => {
        console.log(data)
      }
    )

  }

  downvote(label) {

    this.chatService.downvoteTopic(label).subscribe(
      data => {
        console.log(data)
      }
    )

  }

  save(label) {

    this.chatService.saveTopic(label).subscribe(
      data => {
        console.log(data)
      }
    )

  }

  delete(label) {

    this.chatService.deleteTopic(label).subscribe();

  }

  // add later -> need socket io service
  participate(label) {

  }

  leave(label) {

  }

  edit(label) {

  }


}
