import { Router } from '@angular/router';
import { CommonService } from './../../common.service';
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

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) { 
    if(this.commonService.authenticated) {
      this.getPosts(this.commonService.username); 
    } else {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {}

  getPosts(username) {

    this.userService.getRecentActivityPosts(username).subscribe(
      data => {
        this.posts = data
      }
    )

  }

}
