import { LocalStorageService } from 'ngx-webstorage';
import { ProfileNonHttpService } from './../../profile-feature/profile-non-http.service';
import { CommonService } from './../../common.service';
import { TopicService } from './../topic.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';

import { Event } from '../event';
import { Message } from '../message';
import { Profile } from '../../profile-feature/profile'
import { SocketService } from '../socket.service';
import { UserService } from '../../profile-feature/profile.service';
import { MessageService } from '../message.service';
import { ChatService } from '../chat.service';

import { Topic } from '../chat'

import { Location } from '@angular/common'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {EditTopicModalComponent} from '../edit-topic-modal/edit-topic-modal.component'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatbox') chatbox: ElementRef;
  _subscriptionTopicChange: any;
  topic: Topic;
  relatedTopics: Topic[];
  messages: Message[] = [];
  label: string;
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService,
              private userService: UserService,
              private chatService: ChatService,
              private authService: AuthService,
              public  topicService: TopicService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              public  dialog: MatDialog,
              private commonService: CommonService,
              public  profileNonHttp: ProfileNonHttpService,
              private localSt: LocalStorageService
              )      
        {           
          this.handleAuthentication(); 
          this.handleTopicChange(); 
          this.localSt.clear("currentTopic");
        }
  
  public onScroll(ev): void {
    console.log('scrolled down!!', ev);
  }      

  handleTopicChange() {
    this._subscriptionTopicChange = this.topicService.topicChange.subscribe((value) => {
      
      if (this.topic.id == value.id) {
        this.topic = value;
      }

    }) 
  }
        
  handleAuthentication() {
    if (this.commonService.authenticated) {
      this.profileNonHttp.getProfile(this.commonService.username);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this._subscriptionTopicChange.unsubscribe();
    this.leaveRoom(this.label, this.commonService.username);
    this.localSt.clear('currentTopic');
  }

  isOwner() {
    return this.profileNonHttp.profile.label==this.topic.owner.label
  }

  ngOnInit(): void {

    this.initIoConnection();
    this.topicService.onProfileJoin();
    this.topicService.onProfileLeave();



    this.route.params.subscribe(params =>
    {

      if (this.localSt.retrieve('currentTopic')) {

        console.log("The previous topic was, ", this.localSt.retrieve('currentTopic'))
        
        this.leaveRoom(this.localSt.retrieve('currentTopic'), this.profileNonHttp.profile.label)
  
      }
      this.label = params.label;

      this.localSt.store('currentTopic', params.label)

      this.joinRoom(this.label, this.commonService.username);
      this.topicService.allMessagesSeen(this.label);
      
      this.getTopic(this.label);
      this.getMessages(this.label);

      this.chatbox.nativeElement.scrollIntoView(false)
    });
  }

  getRelatedTopics(chatgroup_label) {
    this.chatService.getRelatedTopics(chatgroup_label).subscribe(
      data => {
        this.relatedTopics = data;
      }
    )
  };

  public joinRoom(label, profile_label) {
    this.socketService.joinRoom(label, profile_label);    
  };

  public leaveRoom(label, profile_label) {
    this.socketService.leaveRoom(label, profile_label);
  };

  getMessages(label) {
    this.chatService.getMessages(label).subscribe(
      data => {
        this.messages = data
      }
    )
  };

  editTopic() {
    const dialogRef = this.dialog.open(EditTopicModalComponent, {
      data: {
        topic: this.topic,
        modalType: 'editTopic'
      },
      height: '500px',
      width: '500px'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.topic = result
      this.topicService.editResult(result);
    })
  }

  getTopic(label) {
		this.chatService.getTopic(label).subscribe(
      data => {
        this.topic = data;
        this.getRelatedTopics(this.topic.chatgroup_object.label)
      }
			)
  }
  
  deleteTopic(label) {
    this.chatService.deleteTopic(label).subscribe();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message)
        this.chatbox.nativeElement.scrollIntoView(false)
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.messageService.newMessage(
      message, 
      this.topic.label, 
      this.profileNonHttp.profile.user_id
      ).subscribe(
      data => { 
        this.socketService.send({
          id: data['id'],
          user: data['user'],
          topic: this.topic.label,
          topic_object: this.topic, 
          sender: this.profileNonHttp.profile,
          text: message,
          timestamp: data['timestamp'],
          likers_count: data['likers_count'],
          shared: false,
          timestamp_human: data['timestamp_human'],
          subtopics: data['subtopics'],
          seen: data['seen']
        }, this.label);        
      }
    )
    this.messageContent = null;
  }
}