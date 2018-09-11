import { LocalStorageService } from 'ngx-webstorage';
import { ProfileNonHttpService } from './../profile-non-http.service';
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


	username: string;
	profile: Profile;
	profileForm: FormGroup;

	constructor(private matDialogRef: MatDialogRef<ProfileModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
				private userService: UserService, private fb: FormBuilder) { 

		this.profile = this.data.profile;

		this.createEditForm()
		
		this.setEditFormValues()

	}

	ngOnInit() {

	}

	createEditForm() {	
        
        this.profileForm = this.fb.group({
            // username: ['',Validators.required],
            about: ['',Validators.required]
        });
	}


	setEditFormValues() {

		this.profileForm.setValue({
		  //  username: this.profile.label,
		   about: this.profile.about
		});	
		
	}

	submitChanges() {
		
		const val = this.profileForm.value;

		if (val.about) {

			this.userService.editProfile(this.profile.label, val.about).subscribe();
			// this.userService.editUserObject(this.profile.label, val.username).subscribe();


			// this.profile.label = val.username;
			this.profile.about = val.about;

			this.matDialogRef.close(this.profile);
		}		

	}

}
