import { Topic } from './../chat';
import { TopicService } from './../topic.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit {

  @Input() topic: Topic;
  
  constructor(public topicService: TopicService) { }

  ngOnInit() {
  }

}
