import { UserService } from './../../profile-feature/profile.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile-feature/profile';
import { Post } from './../../chat-feature/message';





@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  posts: Post[];
  profile: Profile;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.getProfile(localStorage.getItem('username'))
    this.getPosts(localStorage.getItem('username'))

  }

  getProfile(username) {

    this.userService.getProfile(username).subscribe(

      data => {

        this.profile = data
        console.log(this.profile)
        
      }
    ) 
    
  }

  getPosts(username) {

    this.userService.getRecentActivityPosts(username).subscribe(
      data => {
        this.posts = data
      }
    )

  }


}
