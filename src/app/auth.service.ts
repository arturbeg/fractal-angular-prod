// import { Injectable } from '@angular/core';


// // Mock client-side auth service 

// @Injectable()
// export class AuthService {
// 	getAuthorizationToken() {
// 		return 'some-auth-token' // find out way to store it; cache?
// 	}
// }



import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'



@Injectable()
export class AuthService {
    public token: string;
    private restAuthUrlLogin = 'http://localhost:8000/rest-auth/login/';
    private restAuthUrlLogout = 'http://localhost:8000/rest-auth/logout/';

 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(): Observable<boolean> { //username: string, password: string
        return this.http.post(this.restAuthUrlLogin, JSON.stringify({ username: "artur", password: "somepwd" }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: 'artur', token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        //return this.http.post(this.restAuthUrlLogout, JSON.stringify({Content-Type: 'application/json'}))
    }

    getAuthorizationToken() {
        return this.token;
    }





}    