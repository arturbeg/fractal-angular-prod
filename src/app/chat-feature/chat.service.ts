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


	


  chatApiUrl = 'https://fractal-django-prod.herokuapp.com/api/topics/'; // url to web api
  private handleHttpError: HandleError;


	constructor(private http: HttpClient, 
							httpErrorHandler: HttpErrorHandler){
					
    this.handleHttpError = httpErrorHandler.createHandleError('ChatService');								
    
	}  
  
	getTopic(label: string) {

		return this.http.get<Topic>(this.chatApiUrl + label + '/')
			// .map(
			// 	res =>
			// 		{
			// 			return new Topic(res.id, res.name, res.about, res.label, res.rating, res.chatgroup, res.participants, res.most_recent_message)
			// 		}
			// )


	}



	getTopics(username: string) {
                
		console.log("Retriving trendign topics for " + username)
		const topicsApiUrl = 'https://fractal-django-prod.herokuapp.com/api/profiles/' + username + '/' + 'topics/'
		
		return this.http.get<Topic[]>(topicsApiUrl)
			// .map(
			// 	res => res.map(x => new Topic(x.id, x.name, x.about, x.label, x.rating, x.chatgroup, x.participants, x.most_recent_message)
			// ))


	}

	getMessages(label:string) {
		// https://fractal-django-prod.herokuapp.com/api/realtime/messages/?topic=new
		const messagesListApiUrl = 'https://fractal-django-prod.herokuapp.com/api/realtime/messages/?topic=' + label
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
		// https://fractal-django-prod.herokuapp.com/api/topics/test/participate/
		const participateApiUrl = this.chatApiUrl + label + '/' + 'participate/'
		return this.http.get<Topic>(participateApiUrl)
	}

	leaveTopic(label:string) {
		console.log('leave ', label)

		const leaveApiUrl = this.chatApiUrl + label + '/' + 'leave/'
		return this.http.get<Topic>(leaveApiUrl)
	}

	upvoteTopic(label) {
		const upvoteApiUrl = this.chatApiUrl + label + '/' + 'upvote/'
		return this.http.get<Topic>(upvoteApiUrl)
	}

	downvoteTopic(label) {
		const downvoteApiUrl = this.chatApiUrl + label + '/' + 'downvote/'
		return this.http.get<Topic>(downvoteApiUrl)
	}

	saveTopic(label) {
		const saveApiUrl = this.chatApiUrl + label + '/' + 'save/'
		return this.http.get<Topic>(saveApiUrl)
		
	}

	getRelatedTopics(chatgroup_label) {

		// chatgroupApiUrl = 'https://fractal-django-prod.herokuapp.com/api/chatgroups/';
		const relatedTopicsApi = "https://fractal-django-prod.herokuapp.com/api/chatgroups/" + chatgroup_label + "/topics"

		return this.http.get<Topic[]>(relatedTopicsApi)
		
	}

	editTopic(label, newName, newAbout) {
		console.log("Editing the topic: " + label)

		return this.http.patch(this.chatApiUrl + label + '/', {name: newName, about: newAbout})
		
	}

	



}