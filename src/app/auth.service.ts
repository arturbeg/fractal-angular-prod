import { Injectable } from '@angular/core';


// Mock client-side auth service 

@Injectable()
export class AuthService {
	getAuthorizationToken() {
		return 'some-auth-token' // find out way to store it; cache?
	}
}