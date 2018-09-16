import { CommonService } from './../common.service';
import { Subject } from 'rxjs/Subject';
import { ChatService } from './../chat-feature/chat.service';
import { Topic } from './../chat-feature/chat';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { Post } from './../post-feature/post';
import { UserService } from './profile.service';
import { Injectable } from '@angular/core';
import {Profile} from './profile';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Injectable()
export class ProfileNonHttpService {

  profile: Profile;
  posts: Post[];
	username: string;
	topics: Topic[];
	saved_topics: Subject<Topic[]> = new Subject<Topic[]>()

	constructor(private userService: UserService, private dialog: MatDialog,
							private commonService: CommonService) { 
			this.getSavedTopics(this.commonService.username);
			this.handleUsernameChange();
	 }

	 handleUsernameChange() {
			this.commonService.usernameChange.subscribe(
				data => {
					this.getSavedTopics(data);
				}
			)
	 }

  getProfile(username) {
    this.userService.getProfile(username).subscribe(
      data => {
        this.profile = data;
      }
    )
	}


	getPosts(username) {
		this.userService.getProfilePosts(username).subscribe(
			data => {
        console.log(data);
        this.posts = data['results'];
			}
		)
	}

	getSavedTopics(username) {
		this.userService.getProfileSavedTopics(username).subscribe(
			data => {
				console.log(data)
				this.saved_topics.next(data['results']);
			}
		)
	}

  follow(username) {
		this.userService.follow(username).subscribe(
			data => {
				this.profile = data;
			}
		);	
  }
  
  public sayHi() {

    console.log("Edit profile dialog...");
    console.log(this.profile);

    const dialogRef = this.dialog.open(ProfileModalComponent, {
			data: {profile: this.profile},
			height: '500px',
			width: '500px'
		});


		dialogRef.afterClosed().subscribe(result => {
			if(result!=this.profile) {
				this.profile = result;
			}
		});
  }
}
  // openDialog() {
		
	// 	const dialogRef = this.dialog.open(ProfileModalComponent, {
	// 		data: {profile: this.profile},
	// 		height: '500px',
	// 		width: '500px'
	// 	});

	// 	dialogRef.afterClosed().subscribe(result => {

	// 		console.log(`Dialog result: ${result}`);
			
	// 	});
  // }