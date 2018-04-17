import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { UserService }       from '../profile.service';
import { Profile, User }       from '../profile';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ChatGroup } from '../../chatgroup-feature/chatgroup';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

	// followers$: Observable<User[]> // convert to profile later on Python Side
	chatgroups$: Observable<ChatGroup[]>;
	username: string;
	// all the modal types
	editProifle = false;
	profile: Profile;
	profileForm: FormGroup;


	// showChatGroups = false;
	// showFollowers = false;
	// showFollowing = false;

	constructor(private matDialogRef: MatDialogRef<ProfileModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
				private userService: UserService, private fb: FormBuilder) { 

		this.username = this.data.username

		this.createEditForm()

		this.initialiseProfileObject()

		// Set form values

	}


	ngOnInit() {

	}


	initialiseProfileObject() {
		// this.getFollowers()
		// this.getChatGroups(this.data.username);
		console.log("handling edit profile modal")
		if (this.data.modalType == 'editProfile') {
			this.editProifle = true
			this.userService.getProfile(this.username).subscribe(
				data => {

					this.profile = data
					console.log(this.profile)
					// this.createEditForm()
					this.setEditFormValues()

				}
			)
		}			
	}


	getChatGroups(username) {

		this.chatgroups$ = this.userService.getChatGroups(username)

	}

	createEditForm() {
        
        this.profileForm = this.fb.group({
            username: ['',Validators.required],
            about: ['',Validators.required]
        });
	}


	setEditFormValues() {

		this.profileForm.setValue({
		   username: this.profile.label,
		   about: this.profile.about
		});	
		
	}

	submitChanges() {
		
		const val = this.profileForm.value;
		console.log(val)

		if (val.username && val.about) {
			this.userService.editProfile(this.username, val.username, val.about).subscribe()
			this.userService.editUserObject(this.username, val.username).subscribe()


			this.profile.label = val.username
			this.profile.about = val.about

			this.matDialogRef.close(Observable.of(this.profile));
		}		

	}

}
