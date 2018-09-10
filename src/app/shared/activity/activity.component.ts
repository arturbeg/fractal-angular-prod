import { Post } from './../../post-feature/post';
import { UserService } from './../../profile-feature/profile.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile-feature/profile';
// import { Post } from './../../chat-feature/message';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  posts: Post[];
  profile: Profile;
  posts$: Observable<Post[]>

  constructor(
    private userService: UserService
  ) { 
    this.getProfile(localStorage.getItem('username'))
  }

  ngOnInit() {

    // this.getProfile(localStorage.getItem('username'))
    // this.getPosts(localStorage.getItem('username'))

  }

  getProfile(username) {

    this.userService.getProfile(username).subscribe(

      data => {

        this.profile = data
        // console.log(this.profile)
        this.getPosts(this.profile.label)
        this.getPostsObservable(this.profile.label)
        
      }
    ) 
    
  }

  getPosts(username) {

    this.userService.getRecentActivityPosts(username).subscribe(
      data => {
        this.posts = data
        console.log(this.posts)
      }
    )

  }

  getPostsObservable(username) {
    this.posts$ = this.userService.getRecentActivityPosts(username)
  }


}
