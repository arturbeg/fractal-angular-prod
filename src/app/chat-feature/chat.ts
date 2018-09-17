import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatGroup } from './../chatgroup-feature/chatgroup';
import { Profile } from '../profile-feature/profile'

// export class Topic {
// 	id: number;
// 	name: string;
// 	about: string;
// 	label: string;
// 	rating: number;
// 	chatgroup: ChatGroup;
// 	participants: Profile[];
// 	most_recent_message_text: string;


// 	constructor(
// 		id: number,
// 		name: string,
// 		about: string,
// 		label: string,
//  		rating: number,
// 		chatgroup: ChatGroup,
// 		participants: Profile[],
// 		most_recent_message_text: string,

// 	) {
// 		this.id = id;
// 		this.name = name;
// 		this.about = about;
// 		this.label = label;
// 		this.rating = rating;
// 		this.chatgroup = chatgroup;
// 		this.participants = participants;
// 		this.most_recent_message_text = most_recent_message_text;
// 	}
// }


export interface Topic {

	id: number;
	name: string;
	about: string;
	label: string;
	rating: number;
	chatgroup_object: ChatGroup;
	chatgroup: string;
	participants: Profile[];
	most_recent_message_text: string;
	most_recent_message_sender_avatar: string;
	owner: Profile;
	upvoted: boolean;
	downvoted: boolean;
	saved: boolean;
	number_of_unread_messages: number;

}


// export interface Topic {
// 	id: number;
// 	name: string;
// 	about: string;
// 	label: string;
// 	rating: number;
// 	chatgroup: ChatGroup;
// 	participants: Profile[];
// 	most_recent_message_text: string;
// 	// owner
// 	// chatgroup
// 	// description
// 	// avatar
// }