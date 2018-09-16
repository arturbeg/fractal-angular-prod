import { ProfileNonHttpService } from './../../profile-feature/profile-non-http.service';
import { Topic } from './../../chat-feature/chat';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-saved-topics',
  templateUrl: './saved-topics.component.html',
  styleUrls: ['./saved-topics.component.scss']
})
export class SavedTopicsComponent implements OnInit, OnDestroy {

  topics: Topic[];
  _subscriptionSavedTopicsChange: any;

  constructor(private profileNonHttp: ProfileNonHttpService) { 

    this.handleSavedTopicsChange();

  }

  handleSavedTopicsChange() {
    this._subscriptionSavedTopicsChange = this.profileNonHttp.saved_topics.subscribe(  
      data => {
        console.log(data);
        this.topics = data;
      }
    )
  }

  ngOnDestroy() {
    this._subscriptionSavedTopicsChange.unsubscribe();
  }

  ngOnInit() {
  }

}
