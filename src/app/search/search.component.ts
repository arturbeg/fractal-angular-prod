import { Router } from '@angular/router';
import { CommonService } from './../common.service';
import { ChatService } from './../chat-feature/chat.service';
import { Topic } from './../chat-feature/chat';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { ChatGroupService} from './../chatgroup-feature/chatgroup.service';
import { UserService } from './../profile-feature/profile.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  topics: any;
  chatgroups: any;
  profiles: any;
  form: FormGroup;


  constructor(private fb: FormBuilder,
              private chatService: ChatService,
              private commonService: CommonService,
              private router: Router,
              private chatgroupService: ChatGroupService,
              private userService: UserService
              ) {
    if(this.commonService.authenticated) {                 

      this.form = this.fb.group({
        query: [''],
      });   

      // set initial values for searched variables -> explore page like

      // this.topics = this.chatService.searchTopic("");
      // this.chatgroups = this.chatgroupService.searchChatGroup("");
      // this.profiles = this.userService.searchProfile("");
      this.topicSearchResults("");
      this.chatGroupSearchResults("");
      this.profileSearchResults("");

      } else {
        this.router.navigate(['/login'])
      }

  }

  chatGroupSearchResults(query) {

    this.chatgroupService.searchChatGroup(query).subscribe(
      data => {
      this.chatgroups = data['results'];
      }
    );
  };

  topicSearchResults(query) { 
    this.chatService.searchTopic(query).subscribe(
      data => {
        this.topics = data['results'];
        console.log(this.topics);
      }
    );
  }

  profileSearchResults(query) {
    this.profiles = this.userService.searchProfile(query).subscribe(
      data => {
        this.profiles = data['results'];
      }
    )
  }

  submitSearch() {
    const val = this.form.value
    console.log(val)
    if(val.query) {
      console.log("Updating search results!");
      this.topicSearchResults(val.query);
      this.chatGroupSearchResults(val.query);
      this.profileSearchResults(val.query);
    }
  }

  ngOnInit() {
    
  //   this.topics = this.form.get('query')
  //   .valueChanges
  //   .pipe(
  //     debounceTime(300),
  //     switchMap(value => this.chatService.searchTopic(value))
  //   )

  // this.chatgroups = this.form
  //   .get('query')
  //   .valueChanges
  //   .pipe(
  //     debounceTime(300),
  //     switchMap(value => this.chatgroupService.searchChatGroup(value))
  // )    

  // this.profiles = this.form
  //   .get('query')
  //   .valueChanges
  //   .pipe(
  //     debounceTime(300),
  //     switchMap(value => this.userService.searchProfile(value))
  //   ) 
  // }

}
}