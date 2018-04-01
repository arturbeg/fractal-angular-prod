import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ChatGroupInterface } from './chatgroup';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token' 
  })
};


@Injectable()
export class ChatGroupService {


	chatgroupApiUrl = ''; // url to web api
	private handleHttpError: HandleError;


  	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
					
		this.handleHttpError = httpErrorHandler.createHandleError('ChatGroupService');								
	}

	

	addChatGroup (chatgroup: ChatGroupInterface): Observable<ChatGroupInterface> {
	return this.http.post<ChatGroupInterface>(this.chatgroupApiUrl, chatgroup, httpOptions)
	  .pipe(
	    catchError(this.handleHttpError('addChatGroup', chatgroup))
	  );
	}

	getChatGroup() {

		return this.http.get<ChatGroupInterface>(this.chatgroupApiUrl)
				.pipe(
					retry(3), // retry the failed request up to 3 times
					catchError(this.handleError)	
				);
	}

	private handleError(error: HttpErrorResponse) {
		if(error.error instanceof ErrorEvent) {
			// A client-side or network error occured
			// Handle accordingly

			console.error('An error occured: ', error.error.message);

		} else {
			// The backend returned an unsuccessful response code
			// The response body may contain 

			console.error(
      		`Backend returned code ${error.status}, ` +
      		`body was: ${error.error}`);
  				}			

  		return new ErrorObservable('Something went wrong; please try again later.')		
		}
	}