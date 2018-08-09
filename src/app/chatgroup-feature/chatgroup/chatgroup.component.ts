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
	label: string;
	topics: Topic[];


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private chatGroupService: ChatGroupService,	
		public chatgroupNonHttpService: ChatgroupNonHttpService,
	) 
	{ }

	ngOnInit() {
  		this.label = this.route.snapshot.paramMap.get('label');
			this.getChatGroup(this.label);
			this.getTopics(this.label)
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



}


