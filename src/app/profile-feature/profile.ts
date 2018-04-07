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
	// timestamp, avatar, followers
}