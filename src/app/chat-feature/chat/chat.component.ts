import { CommonService } from './../../common.service';
import { TopicService } from './../topic.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';

import { Action } from '../action';
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
  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('chatbox') chatbox: ElementRef;
  
  authenticated: boolean;
  username: string;
  // _subscription: any; 
  _subscriptionTopicChange: any;


  topic: Topic;
  relatedTopics: Topic[];
  action = Action;
  profile: Profile;
  messages: Message[] = [];
  label: string;
  messageContent: string;
  ioConnection: any;
  currentRoute: string;

  constructor(private socketService: SocketService,
              private userService: UserService,
              private chatService: ChatService,
              private authService: AuthService,
              public topicService: TopicService,
              

              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,

              public  dialog: MatDialog,

              private commonService: CommonService

              ) 
              
        {           

          this.handleAuthentication(); 
          this.handleTopicChange();
          

        }


  handleTopicChange() {

    this._subscriptionTopicChange = this.topicService.topicChange.subscribe((value) => {
      
      if (this.topic.id == value.id) {
        this.topic = value;
      }

    }) 

  }
        
  handleAuthentication() {

    this.authenticated = this.commonService.authenticated;

    if (this.authenticated) {
      this.username = this.commonService.username
      this.getProfile(this.username)

    } else {
      this.router.navigate(['/login']);
    }

    // this._subscription = this.authService.authenticatedChange.subscribe((value) => { 
    //   console.log("Applying the change to the value of authenticated")
    //   console.log(value)

    //   if (value==true) {
    //     this.username = this.authService.username;
    //     this.authenticated = true;
    //   } else {
    //     this.authenticated = false;
    //     this.username = '';
    //     this.router.navigate(['/login']);

    //   }
     
    // });


  }

  ngOnDestroy() {
    // this._subscription.unsubscribe();
    this._subscriptionTopicChange.unsubscribe();
  }

  isOwner() {
    return this.profile.label==this.topic.owner.label
  }

  ngOnInit(): void {

    this.initIoConnection();

    this.route.params.subscribe(params =>
    {

      if (localStorage.getItem('currentTopic')) {

        console.log("The previous topic was, ", localStorage.getItem('currentTopic'))
        this.leaveRoom(localStorage.getItem('currentTopic'))
  
      }

      this.label = params.label
      
      localStorage.setItem('currentTopic', params.label)

      this.joinRoom(this.label)
      
      this.getTopic(this.label);
      this.getMessages(this.label);

      // scroll to bottom
      this.chatbox.nativeElement.scrollIntoView(false)


    });

  }


  getRelatedTopics(chatgroup_label) {

    this.chatService.getRelatedTopics(chatgroup_label).subscribe(
      data => {
        this.relatedTopics = data
        console.log(data)
      }
    )

  }

  public joinRoom(label) {
    console.log("Joining the room ", label)
    // update online_participants
    this.chatService.participateTopic(label).subscribe(data => {
      console.log(data)
    })

    this.socketService.joinRoom(label)
    
  }

  public leaveRoom(label) {
    console.log("Leaving the room ", label)
    // update online_participants
    this.chatService.leaveTopic(label).subscribe(data =>
      {
        console.log(data)
      }
    )
    
    this.socketService.leaveRoom(label)

  }



  getMessages(label) {
    this.chatService.getMessages(label).subscribe(
      data => {
        console.log(data)
        this.messages = data
        // this.scrollToBottom();
      }
    )
  }

  editTopic() {


    console.log("Editing the topic")

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

      // play with topic service here

      this.topicService.editResult(result);
    })
 

  }

  getTopic(label) {
		this.chatService.getTopic(label).subscribe(
      data => {
        this.topic = data;
        this.getRelatedTopics(this.topic.chatgroup.label)
      }
      
			);
  }
  
  deleteTopic(label) {
    // Deleting the topic
    this.chatService.deleteTopic(label).subscribe();
  }

  // upvoteTopic(label) {
  //   this.chatService.upvoteTopic(label).subscribe(
  //     data => {
  //       console.log(data)
  //     }
  //   )
  // }

  // downvoteTopic(label) {
  //   this.chatService.downvoteTopic(label).subscribe(
  //     data => {
  //       console.log(data)
  //     }
  //   )
  // }

  // saveTopic(label) {
  //   this.chatService.saveTopic(label).subscribe(
  //     data => {
  //       console.log(data)
  //     }
  //   )
  // }

  private getProfile(username) {

    this.userService.getProfile(username).subscribe(

      data => {

        this.profile = data;
        console.log(this.profile);

      }
    )

  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message)
        this.chatbox.nativeElement.scrollIntoView(false)
      });
   
  }

  // private ioParticipantUpdates() {

  //   this.socketService.onNewParticipant()
  //   this.socketService.onLeaveParticipant()

  // }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    // save the message via Django REST

    this.messageService.newMessage(message, this.topic.label, this.profile.id).subscribe(
      
      data => { 

        console.log(data)
        
    // send the message to Socket IO
        this.socketService.send({
          id: data['id'],
          user: data['user'],
          topic: this.topic.label,
          topic_object: this.topic, 
          sender: this.profile,
          text: message,
          timestamp: data['timestamp'],
          likers_count: data['likers_count'],
          shared: false,
          timestamp_human: data['timestamp_human']
        }, this.label);        
      
  
      }

    )
    
    this.messageContent = null;
  }


}