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
	//profile: Profile;

	constructor(
			  private userService: UserService,
			  private route: ActivatedRoute,
			  private router: Router,
			  public  dialog: MatDialog
			  ) { }


	ngOnInit() {

		this.getProfile()

	}


	openDialog() {
		
		const dialogRef = this.dialog.open(ProfileModalComponent, config: {
			data: {name: 'Profile Modal'}
		});

		dialogRef.afterClosed().subscribe(result => {

			console.log(`Dialog result: ${result}`);
			
			});
	}



	getProfile() {

		    this.profile$ = this.route.paramMap
      		.switchMap((params: ParamMap) =>
       		this.userService.getProfile(params.get('username')));
	}



  
}
