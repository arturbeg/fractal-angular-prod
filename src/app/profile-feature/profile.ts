export interface User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}


// add profile model later


export interface Profile {
	id: number;
	about: string;
	label: string; // <-- same as the username
	followers_count: number;
	following_count: number;
	chatgroups_count: number;
	followed: boolean;
	user_id: number;
	avatar: string;
	online: boolean;
	///user: User;
	// timestamp, avatar, followers
}