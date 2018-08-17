import { Post } from './../../chat-feature/message';
import { Component, OnInit } from '@angular/core';
import { User } 			 from '../profile';
import { UserService }       from '../profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Profile } from '../profile'
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component'
import { ChatGroupComponent }	from '../../chatgroup-feature/chatgroup/chatgroup.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

	profile$: Observable<Profile>;
	username: string;
	posts: Post[];

	//profile: Profile;

	constructor(
			  private userService: UserService,
			  private route: ActivatedRoute,
			  private router: Router,
			  public  dialog: MatDialog,
			  ) { }


	ngOnInit() {

		this.getProfile()
		

		// later on replace snapshot by dynamic route functions (like in the chat section -> implement each relevent angular documentation feature within the app)
		this.username = this.route.snapshot.paramMap.get('username');
		this.getPosts(this.username);

	}


	openDialog() {
		
		const dialogRef = this.dialog.open(ProfileModalComponent, {
			data: {username: this.username,
				   modalType: 'showChatGroups'},
			height: '500px',
			width: '500px'
		});

		dialogRef.afterClosed().subscribe(result => {

			console.log(`Dialog result: ${result}`);
			
		});
	}


	editProifle() {

		const dialogRef = this.dialog.open(ProfileModalComponent, {
			data: {username: this.username,
				   modalType: 'editProfile'},
			height: '500px',
			width: '500px'
		});


		dialogRef.afterClosed().subscribe(result => {

			console.log(result);
			this.profile$ = result
			// update the profile object (Observable)

			
		});

	}


	getProfile() {

		    this.profile$ = this.route.paramMap
      		.switchMap((params: ParamMap) =>
       		this.userService.getProfile(params.get('username')));
	}

	getPosts(username) {

		this.userService.getProfilePosts(username).subscribe(
			data => {
				this.posts = data
			}
		)

	}


	follow() {

		this.userService.follow(this.username).subscribe()
		
	}

	verifyToken() {

		this.userService.verifyToken()
		
	}


  
}
