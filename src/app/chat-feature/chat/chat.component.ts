import { Component, OnInit } from '@angular/core';

import { Action } from '../action';
import { Event } from '../event';
import { Message } from '../message';
// import { User } from './shared/model/user';
import { Profile } from '../../profile-feature/profile'
import { SocketService } from '../socket.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component_new.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  action = Action;
  profile: Profile;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
        // at the same time can save the message via the django backend
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.profile,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.profile,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.profile.label,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }




}
