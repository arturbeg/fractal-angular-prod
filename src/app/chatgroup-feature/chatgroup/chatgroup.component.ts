import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ChatGroup, ChatGroupInterface } from '../chatgroup';

import { ChatGroupCardComponent } from '../chatgroup-card/chatgroup-card.component';

import { ChatGroupService } from '../chatgroup.service';


import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-chatgroup',
  templateUrl: './chatgroup.component.html',
  styleUrls: ['./chatgroup.component.scss'],
  providers: [ChatGroupService],
})
export class ChatGroupComponent implements OnInit {

	chatgroup: ChatGroupInterface;

	label: string

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private chatGroupService: ChatGroupService,	
	) 
	{ }

	ngOnInit() {
  		this.label = this.route.snapshot.paramMap.get('label');
  		this.getChatGroup(this.label);
	}

	getChatGroup(label) {
		this.chatGroupService.getChatGroup(label).subscribe(
			data => this.chatgroup = data
			);
	}


	follow() {

		this.chatGroupService.follow(this.label).subscribe(

			data =>  {
				console.log(data)
			}

		)

	}

	getChatGroupFollowers() {

	}


	getChatGroupLocalChats() {

	}


	getChatGroupTopics() {

	}





}





	// getChatGroupResponse() {

	// 	this.chatgroupService.getChatGroup()
	// 		// resp is of type 'HttpResponse<Config>'
	// 		.subscribe(

	// 			resp => {
	// 				// display its headers
	// 				const keys = resp.headers.keys();
	// 				this.headers = 
	// 			}
	// 		)
	// }



	// id: data['id'],
	// name: data['name'],
	// about: data['about'],
	// description: data['description'],
	// label: data['label'],
	// followers_count: data['followers_count'],