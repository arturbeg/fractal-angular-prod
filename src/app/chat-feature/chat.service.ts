import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Topic } from './chat'

import { Message } from './message'

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


@Injectable()
export class ChatService {


  chatApiUrl = 'http://localhost:8000/api/topics/'; // url to web api
  private handleHttpError: HandleError;


	constructor(private http: HttpClient, 
							httpErrorHandler: HttpErrorHandler){
					
    this.handleHttpError = httpErrorHandler.createHandleError('ChatService');								
    
	}  
  
	getTopic(label: string) {

		return this.http.get<Topic>(this.chatApiUrl + label + '/')
			.map(
				res =>
					{
						return new Topic(res.id, res.name, res.about, res.label, res.rating, res.chatgroup, res.participants, res.most_recent_message)
					}
			)


	}



	getTopics(username: string) {
                
		console.log("Retriving trendign topics for " + username)
		const topicsApiUrl = 'http://localhost:8000/api/profiles/' + username + '/' + 'topics/'
		
		return this.http.get<Topic[]>(topicsApiUrl)
			.map(
				res => res.map(x => new Topic(x.id, x.name, x.about, x.label, x.rating, x.chatgroup, x.participants, x.most_recent_message)
			))


	}

	getMessages(label:string) {
		// http://127.0.0.1:8000/api/realtime/messages/?topic=new
		const messagesListApiUrl = 'http://127.0.0.1:8000/api/realtime/messages/?topic=' + label
		return this.http.get<Message[]>(messagesListApiUrl)
	}


	// newOnlineParticipant(label:string, )


	deleteTopic(label:string) {
		// delete the topic
		return this.http.delete(this.chatApiUrl + label + '/')
	}

	// leaves online_participats if already there
	participateTopic(label:string) {
		console.log('participate ', label)
		// http://127.0.0.1:8000/api/topics/test/participate/
		const participateApiUrl = this.chatApiUrl + label + '/' + 'participate/'
		return this.http.get(participateApiUrl)
	}

	leaveTopic(label:string) {
		console.log('leave ', label)

		const leaveApiUrl = this.chatApiUrl + label + '/' + 'leave/'
		return this.http.get(leaveApiUrl)
	}

	upvoteTopic(label) {
		const upvoteApiUrl = this.chatApiUrl + label + '/' + 'upvote/'
		return this.http.get(upvoteApiUrl)
	}

	downvoteTopic(label) {
		const downvoteApiUrl = this.chatApiUrl + label + '/' + 'downvote/'
		return this.http.get(downvoteApiUrl)
	}

	saveTopic(label) {
		const saveApiUrl = this.chatApiUrl + label + '/' + 'save/'
		return this.http.get(saveApiUrl)
		
	}

	editTopic(label, newName, newAbout) {
		console.log("Editing the topic: " + label)

		return this.http.patch(this.chatApiUrl + label + '/', {name: newName, about: newAbout})
		
	}



}