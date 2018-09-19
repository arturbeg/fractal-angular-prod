import { CommonModalComponent } from './../common-modal/common-modal.component';
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
	saved_topics: Subject<Topic[]> = new Subject<Topic[]>();
	profileChanges: Subject<Profile> = new Subject<Profile>();

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
				this.profileChanges.next(data);
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

	public editProfileAvatar(event)  {
		console.log("Editing profile avatar!!");
		console.log(event);

		const selectedFile = event.target.files[0];
		console.log(selectedFile); 
		const fd: FormData = new FormData();
		fd.append('avatar', selectedFile);

		this.userService.editProfileAvatar(this.profile.label, fd)
			.subscribe(
				data => {
					console.log(data);
					this.profile = data;
				}
			)

	}
	
	public createDialog(data) {
		const dialogRef = this.dialog.open(CommonModalComponent, {
			data: data,
			height: '500px',
			width: '500px'
		});
	}


	public showFollowers(username) {

		this.userService.getFollowers(username).subscribe(
			data => {
				const dialogData = {
					profiles: data
				}
				this.createDialog(dialogData)
			}
		)
	}

	public showFollowing(username) {

		this.userService.getFollowing(username).subscribe(
			data => {
				const dialogData = {
					profiles: data
				}
				this.createDialog(dialogData);
			}
		)

	}


	public showChatGroups(username) {

		this.userService.getChatGroups(username).subscribe(
			data => {
				const dialogData = {
					chatgroups: data
				}
				this.createDialog(dialogData);
			}
		)
		
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