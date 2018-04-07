import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { AuthService } from '../auth.service';
import { User, Profile } from './profile';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token' 
  })
};


@Injectable()
export class UserService {
    
	private handleHttpError: HandleError;
	private rootApiUrl = 'http://localhost:8000/api/profiles/'


    constructor(
        private authService: AuthService, httpErrorHandler: HttpErrorHandler, private http: HttpClient) {

    	this.handleHttpError = httpErrorHandler.createHandleError('UserService');								
    }


    getProfile(username) {
    	// receives a profile object by the username
    	const profileApiUrl = this.rootApiUrl + '/' + username
    	return this.http.get<Profile>(profileApiUrl)
    }

    
}