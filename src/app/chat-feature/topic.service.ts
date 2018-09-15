import { SocketService } from './socket.service';
import { MatSnackBar } from '@angular/material';
import { SnackBar } from './message/snack-bar';
import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Topic } from './chat';


@Injectable()
export class TopicService {


  topicChange: Subject<Topic> = new Subject<Topic>();
  ioConnectionProfileLeave: any;
  ioConnectionProfileJoin: any;  
  
  constructor(private chatService: ChatService,
              public snackBar: MatSnackBar,
              private socketService: SocketService) {}

  
  onProfileLeave() {
    this.ioConnectionProfileLeave = this.socketService.onLeaveRoom()
      .subscribe(
        data => {
          console.log(data);
          const text = `${data.profile_label} left the topic`;
          this.openSnackBarUserJoinedOrLeft(text)

        }
      )
  }

  onProfileJoin() {
    this.ioConnectionProfileJoin = this.socketService.onJoinRoom()
      .subscribe(
        data => {
          console.log(data);
          const text = `${data.profile_label} joined the topic`;
          this.openSnackBarUserJoinedOrLeft(text);
        }
      )
  }


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

  openSnackBarUserJoinedOrLeft(text) {
    this.snackBar.openFromComponent(SnackBar, {
      duration: 2000,
      data: {
        text:text
      }
    });
  }

}
