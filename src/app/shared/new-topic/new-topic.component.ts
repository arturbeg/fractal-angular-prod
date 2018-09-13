import { ChatGroupService } from './../../chatgroup-feature/chatgroup.service';
import { ChatService } from './../../chat-feature/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ChatGroup} from './../../chatgroup-feature/chatgroup';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {

  form: FormGroup;    
  filteredChatgroups: any;

  constructor(private chatService: ChatService,
              private fb: FormBuilder,
              private router: Router,
              private chatgroupService: ChatGroupService
              ) { 

                this.form = this.fb.group({
                  name: ['',Validators.required],
                  about: [''],
                  chatgroup_input: [null, Validators.required]
                });

                this.filteredChatgroups = this.form
                  .get('chatgroup_input')
                  .valueChanges
                  .pipe(
                    debounceTime(300),
                    switchMap(value => this.chatgroupService.searchChatGroup(value))
                  )
              }

  ngOnInit() {

  }

  displayFn(chatgroup: ChatGroup) {
    if (chatgroup) { return chatgroup.name }
  }

  submit() {
    const val = this.form.value;
    console.log(val);
    if(val.name && val.chatgroup_input) {
      console.log(val.chatgtoup_object);
      const topic_object = {
        name: val.name,
        about: val.about,
        chatgroup: val.chatgroup_input.label
      }

      this.chatService.newTopic(topic_object).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/chat', data.label])
        }
      )
      
    }


  }

}
