import { ChatService } from './../chat-feature/chat.service';
import { Topic } from './../chat-feature/chat';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  topics: any;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private chatService: ChatService
              ) {

    this.form = this.fb.group({
      query: [''],
    }); 

    this.topics = this.form.get('query')
      .valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.chatService.searchTopic(value))
      )



  }

  ngOnInit() {
  }

}
