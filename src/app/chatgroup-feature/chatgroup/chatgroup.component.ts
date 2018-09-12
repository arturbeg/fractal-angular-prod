import { Profile } from './../../profile-feature/profile';
import { ChatCardComponent } from './../../chat-feature/chat-card/chat-card.component';
import { FollowersModalComponent } from './../followers-modal/followers-modal.component';
import { Topic } from './../../chat-feature/chat';
import { ChatgroupNonHttpService } from './../chatgroup-non-http.service';
import { ChatGroup } from './../chatgroup';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ChatGroupCardComponent } from '../chatgroup-card/chatgroup-card.component';
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { ChatGroupService } from '../chatgroup.service';





@Component({
  selector: 'app-chatgroup',
  templateUrl: './chatgroup.component.html',
  styleUrls: ['./chatgroup.component.scss'],
})
export class ChatGroupComponent implements OnInit {

	chatgroup: ChatGroup;
	followers: Profile[];
	label: string;
	topics: Topic[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private chatGroupService: ChatGroupService,	
		public chatgroupNonHttpService: ChatgroupNonHttpService,
		private dialog: MatDialog
	) 
	{ }

	ngOnInit() {
  		this.label = this.route.snapshot.paramMap.get('label');
			this.getChatGroup(this.label);
			this.getFollowers(this.label);
			this.getTopics(this.label);
	}
		
	follow(label) {
    this.chatGroupService.followChatGroup(label).subscribe(
      data => {
				this.chatgroup = data;
      }
    )
	}
	

	openDialog() {
		
		// const dialogRef = this.dialog.open(FollowersModalComponent, {
		// 	data: {

		// 	},
		// 	height: '500px',
		// 	width: '500px',


		// });

		let dialogRef = this.dialog.open(FollowersModalComponent, {
			data: { followers: this.followers },
			height: '500px',
			width: '500px',
		});

		
		
		dialogRef.afterClosed().subscribe(result => {

			console.log(`Dialog result: ${result}`);
			
		});
	}

	getChatGroup(label) {
		this.chatGroupService.getChatGroup(label).subscribe(
			data => this.chatgroup = data
			);
	}


  getTopics(label) {
    this.chatGroupService.getChatGroupTopics(label).subscribe(
      data => {
				console.log(data)
				this.topics = data
      }
    )
	}
	
	getFollowers(label) { 
		console.log("Getting chatgroup followers")
		this.chatGroupService.getChatGroupFollowers(label).subscribe(
			data => {
				console.log(data);
				this.followers = data;
				console.log(this.followers)

			}
		)
	}


}


