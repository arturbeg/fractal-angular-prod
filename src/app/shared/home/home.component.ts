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
  styleUrls: ['./home.component.scss'],
  providers: [Topic]
})
export class HomeComponent implements OnInit {
  

  topics: Topic[];
  profile: Profile;


  constructor(private chatService: ChatService,
              private userService: UserService,
              public topicService: TopicService,
              )

      { 
          
        if (localStorage.getItem('username')) {         
          this.getProfile(localStorage.getItem('username'))
                    
        } else {
          console.log("Please log in to chat!")
        }
        
}

  ngOnInit() {
    // getting the topics within the getProfileMethod
  }

  public getTopics(username) {

    this.chatService.getTopics(username).subscribe(
      data => {
        this.topics = data
        console.log(this.topics)
      }
    )

  }

  // have a separate function in a profile service for this ->  
  public getProfile(username) {

    this.userService.getProfile(username).subscribe(

      data => {

        this.profile = data
        console.log(this.profile)
        this.getTopics(this.profile.label)

      }
    )

  }


}
