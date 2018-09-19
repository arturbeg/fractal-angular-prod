import { Profile } from './../profile-feature/profile';
import { Topic } from './../chat-feature/chat';
import { ChatGroup } from './chatgroup';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class ChatGroupService {

	chatgroupApiUrl = 'https://fractal-django-prod.herokuapp.com/api/chatgroups/';


	private handleHttpError: HandleError;


  	constructor(
			
			private http: HttpClient, 
			httpErrorHandler: HttpErrorHandler
			
		
		){
					
		this.handleHttpError = httpErrorHandler.createHandleError('ChatGroupService');								
	}

	// reconfigure
	addChatGroup (chatgroup: ChatGroup): Observable<ChatGroup> {
	return this.http.post<ChatGroup>(this.chatgroupApiUrl, chatgroup)
	  .pipe(
	    catchError(this.handleHttpError('addChatGroup', chatgroup))
	  );
	}

	getChatGroup(label: string) {

		return this.http.get<ChatGroup>(this.chatgroupApiUrl + label + '/')
	}

	getChatGroupFollowers(label: string) {
		const chatgroupFollowersApiUrl = this.chatgroupApiUrl + label + '/followers/'
		return this.http.get<Profile[]>(chatgroupFollowersApiUrl)

	}

	getChatGroupTopics(label: string) {
	
		const chatgroupTopicsApiUrl = this.chatgroupApiUrl + label + '/topics/'
		
		return this.http.get<Topic[]>(chatgroupTopicsApiUrl)

	}

	followChatGroup(label:string) {

		const followApiUrl = this.chatgroupApiUrl + label + '/follow/'

		return this.http.get<ChatGroup>(followApiUrl)

	}


	deleteChatGroup(label: string): Observable<{}> {

		const url = this.chatgroupApiUrl + label + '/'
		return this.http.delete(url)
			.pipe(

				catchError(this.handleHttpError('deleteChatGroup'))
			);

	}


	newChatGroup(chatgroup_object) {
		return this.http.post<ChatGroup>(this.chatgroupApiUrl, chatgroup_object)
	}


	updateChatGroup(chatgroup:ChatGroup): Observable<ChatGroup> {
		return this.http.put<ChatGroup>(this.chatgroupApiUrl, chatgroup)
			.pipe(

				catchError(this.handleHttpError('updateChatGroup', chatgroup))
			);
	
		}

	searchChatGroup(term:string) {
		const searchApiUrl = this.chatgroupApiUrl + '?search=' + term;
		console.log(searchApiUrl);
		return this.http.get(searchApiUrl)
	}	

	}




// searchChatGroup(term:string): Observable<ChatGroup[]> {

// 	term = term.trim();

// 	const options = term ?

// 	{ params: new HttpParams().set('name', term) } : {};

// 	return this.http.get<ChatGroup[]>(this.chatgroupApiUrl, options)
// 		.pipe(

// 			catchError(this.handleHttpError<ChatGroup[]>('searchChatGroup', []))

// 		);
// }

