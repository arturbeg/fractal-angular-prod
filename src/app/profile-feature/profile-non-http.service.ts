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
  
  constructor(private userService: UserService, private dialog: MatDialog) {  }

  getProfile(username) {
    this.userService.getProfile(username).subscribe(
      data => {
        this.profile = data
      }
    )
	}


	getPosts(username) {
		this.userService.getProfilePosts(username).subscribe(
			data => {
        console.log(data) 
        this.posts = data
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
			console.log(result);
			this.profile = result
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