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
			.map(
				res => {
					return new ChatGroup(res.id, res.name, res.about, res.description, res.label, res.followers_count, res.topics_count, res.timestamp, res.owner)
				}
			)



	}

	getChatGroupFollowers(label: string) {
		const chatgroupFollowersApiUrl = this.chatgroupApiUrl + label + '/followers/'
		return this.http.get<Profile[]>(chatgroupFollowersApiUrl)

	}

	getChatGroupTopics(label: string) {
		
		
		const chatgroupTopicsApiUrl = this.chatgroupApiUrl + label + '/topics/'
		
		return this.http.get<Topic[]>(chatgroupTopicsApiUrl)
		.map(
			res => res.map(x => new Topic(x.id, x.name, x.about, x.label, x.rating, x.chatgroup, x.participants, x.most_recent_message)
		))

	}

	followChatGroup(label:string) {

		const followApiUrl = this.chatgroupApiUrl + label + '/follow/'

		return this.http.get(followApiUrl)

	}


	deleteChatGroup(label: string): Observable<{}> {

		const url = this.chatgroupApiUrl + label + '/'
		return this.http.delete(url)
			.pipe(

				catchError(this.handleHttpError('deleteChatGroup'))
			);

	}


	updateChatGroup(chatgroup:ChatGroup): Observable<ChatGroup> {
		return this.http.put<ChatGroup>(this.chatgroupApiUrl, chatgroup)
			.pipe(

				catchError(this.handleHttpError('updateChatGroup', chatgroup))
			);
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

