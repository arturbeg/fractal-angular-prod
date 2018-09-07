import { Topic } from './../chat';
import { TopicService } from './../topic.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit, OnDestroy {

  @Input() topic: Topic;
  _subscription: any;


  
  constructor(public topicService: TopicService) {

    this._subscription = this.topicService.topicChange.subscribe((value) => {
      
      if (this.topic.id == value.id) {
        this.topic = value;
      }

    })

   }


  updateTopicWhenChangesMade() {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
