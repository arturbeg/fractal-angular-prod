export class ChatGroup {
	id: number;
	name: string;
	about: string;
	description: string;
	label: string;
	
	// timestamp: string; 		// necessary manipulations done on the server (or can use  date-time library)	
	// owner: string; 			// profile object	
	// avatar: string;			// a link to the avatar
	// members: Array<any>; 	// Gonna be an array of profile objects (no user object on the front end)
}


// delete later
export interface ChatGroupInterface {
	id: number;
	name: string;
	about: string;
	description: string;
	label: string;	
}















/*
members -> might be a large object -> so need to set the paginator
At this stage would be wiser to just include a detail_route with a 
paginator class and permission classes
Have a similar approach for the other models
url: string; Don't really need the url -> can construct it using the label
*/