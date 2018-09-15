import { Router } from '@angular/router';
import { CommonService } from './../common.service';
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
              private chatService: ChatService,
              private commonService: CommonService,
              private router: Router
              ) {
    if(this.commonService.authenticated) {                 

      this.form = this.fb.group({
        query: [''],
      }); 

      this.topics = this.form.get('query')
        .valueChanges
        .pipe(
          debounceTime(300),
          switchMap(value => this.chatService.searchTopic(value))
        )

      } else {
        this.router.navigate(['/login'])
      }

  }

  ngOnInit() {
  }

}
