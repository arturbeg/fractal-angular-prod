import { Profile } from './../profile-feature/profile';
import { Injectable } from '@angular/core';


// @Injectable()
// export class ChatGroup {
// 	id: number;
// 	name: string;
// 	about: string;
// 	description: string;
// 	label: string;
// 	followers_count: number;	
// 	topics_count: number;
// 	localchats_count: number;
// 	timestamp: string;
// 	owner: Profile;
// 	followed: boolean;

// 	constructor(
// 		id: number,
// 		name: string,
// 		about: string,
// 		description: string,
// 		label: string,
// 		followers_count: number,	
// 		topics_count: number,
// 		timestamp: string,
// 		owner: Profile,
// 		followed: boolean

// 	) {
// 		this.id = id;
// 		this.name = name;
// 		this.about = about;
// 		this.description = description;
// 		this.label = label;
// 		this.followers_count = followers_count;
// 		this.topics_count = topics_count;
// 		this.timestamp = timestamp;
// 		this.owner = owner;
// 		this.followed = followed;
// 	}
// }

export interface ChatGroup {

	id: number;
	name: string;
	about: string;
	description: string;
	label: string;
	followers_count: number;	
	topics_count: number;
	localchats_count: number;
	timestamp: string;
	owner: Profile;
	followed: boolean;

}















/*
members -> might be a large object -> so need to set the paginator
At this stage would be wiser to just include a detail_route with a 
paginator class and permission classes
Have a similar approach for the other models
url: string; Don't really need the url -> can construct it using the label
*/