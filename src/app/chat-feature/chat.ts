import { ChatGroup } from './../chatgroup-feature/chatgroup';

export interface Chat {
	id: number;
	name: string;
}


export interface Topic {
	id: number;
	name: string;
	about: string;
	label: string;
	rating: number;
	chatgroup: ChatGroup;
	// owner
	// chatgroup
	// description
	// avatar
}