export class User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}


// add profile model later


export class Profile {
	id: number;
	about: string;
	label: string; // <-- same as the username
	followers_count: number;
	following_count: number;
	chatgroups_count: number;
	// timestamp, avatar, followers
}