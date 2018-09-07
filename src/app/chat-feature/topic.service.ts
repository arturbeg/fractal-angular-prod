import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBar } from './message/snack-bar';
import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Topic } from './chat';


@Injectable()
export class TopicService {


  topicChange: Subject<Topic> = new Subject<Topic>();
  
  
  constructor(private chatService: ChatService,
              public snackBar: MatSnackBarModule) { }

  
  editResult(topic) {

    this.topicChange.next(topic)

  }

  upvote(label) {

    this.chatService.upvoteTopic(label).subscribe(
      data => {
        console.log(data)
        this.topicChange.next(data)
      }
    )

  }

  downvote(label) {

    this.chatService.downvoteTopic(label).subscribe(
      data => {
        console.log(data)
        this.topicChange.next(data)
      }
    )

  }

  save(label) {

    this.chatService.saveTopic(label).subscribe(
      data => {
        console.log(data)
        this.topicChange.next(data)
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
