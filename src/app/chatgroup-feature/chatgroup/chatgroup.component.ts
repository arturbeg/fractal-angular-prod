import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ChatGroup, ChatGroupInterface } from '../chatgroup';

import { ChatGroupCardComponent } from '../chatgroup-card/chatgroup-card.component';

import { ChatGroupService } from '../chatgroup.service';
@Component({
  selector: 'app-chatgroup',
  templateUrl: './chatgroup.component.html',
  styleUrls: ['./chatgroup.component.scss'],
  providers: [ChatGroupService],
})
export class ChatGroupComponent implements OnInit {

	chatgroup: ChatGroupInterface;
	// delete later
	error: any;

	id: number; // <-- will delete this

	// Need to create a chatgroup service
	// Follow the hero service example
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private chatGroupService: ChatGroupService,	
		// private service: ChatGroupService
	) 
	{ }

	ngOnInit() {
		// this.hero$ = this.route.paramMap
  		//.switchMap((params: ParamMap) =>
  		//this.service.getHero(params.get('id')));
  		this.getChatGroup();
	}

	getChatGroup() {

		this.chatGroupService.getChatGroup().subscribe(

			data => this.chatgroup = {

				id: data['id'],
				name: data['name'],
				about: data['about'],
				description: data['description'],
				label: data['label'],
				followers_count: data['followers_count'],
			}

			);

	}


	getChatGroupFollowers() {

	}


	getChatGroupLocalChats() {

	}


	getChatGroupTopics() {

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

}
