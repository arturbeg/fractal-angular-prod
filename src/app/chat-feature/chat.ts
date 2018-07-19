import { ChatGroup } from './../chatgroup-feature/chatgroup';
import { Profile } from '../profile-feature/profile'

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
	participants: Profile[];
	// owner
	// chatgroup
	// description
	// avatar
}