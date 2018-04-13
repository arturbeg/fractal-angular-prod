import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { UserService }       from '../profile-feature/profile.service';
import { Profile }       from '../profile-feature/profile';
import { User }       from '../profile-feature/profile';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	followers: any // convert to profile later on Python Side


	constructor(private matDialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
				private userService: UserService) { }


	ngOnInit() {

		this.getFollowers()

	}

	getFollowers() {

			this.followers = this.userService.getFollowers(this.data.username).subscribe()

	}

}
