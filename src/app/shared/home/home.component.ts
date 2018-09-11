import { Router } from '@angular/router';
import { ProfileNonHttpService } from './../../profile-feature/profile-non-http.service';
import { CommonService } from './../../common.service';
import { TopicService } from './../../chat-feature/topic.service';
import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import { Topic } from '../../chat-feature/chat';
import { ChatService } from '../../chat-feature/chat.service'
import { Profile } from '../../profile-feature/profile';
import { UserService } from '../../profile-feature/profile.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  topics: Topic[];

  constructor(private chatService: ChatService,
              private userService: UserService,
              public topicService: TopicService,
              public commonService: CommonService,
              private router: Router
              )

      { 
        if(this.commonService.authenticated) {
          this.getTopics(this.commonService.username); 
        } else {
          this.router.navigate(['/login'])
        }
      }

  ngOnInit() {

  }

  public getTopics(username) {
    this.chatService.getTopics(username).subscribe(
      data => {
        this.topics = data
      }
    )
  }

}
