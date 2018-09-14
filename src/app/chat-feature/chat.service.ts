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


	


  chatApiUrl = 'https://fractal-django-prod.herokuapp.coapi/topics/'; // url to web api
  private handleHttpError: HandleError;


	constructor(private http: HttpClient, 
							httpErrorHandler: HttpErrorHandler){
					
    this.handleHttpError = httpErrorHandler.createHandleError('ChatService');								
    
	}  
  
	getTopic(label: string) {
		return this.http.get<Topic>(this.chatApiUrl + label + '/')
	}



	getTopics(username: string) {
                
		console.log("Retriving trendign topics for " + username)
		const topicsApiUrl = 'https://fractal-django-prod.herokuapp.coapi/profiles/' + username + '/' + 'topics/'
		
		return this.http.get<Topic[]>(topicsApiUrl)
	}

	getMessages(label:string) {
		const messagesListApiUrl = 'https://fractal-django-prod.herokuapp.coapi/realtime/messages/?ordering=timestamp&topic=' + label
		return this.http.get<Message[]>(messagesListApiUrl)
	}



	deleteTopic(label:string) {
		return this.http.delete(this.chatApiUrl + label + '/')
	}

	newTopic(topic_object) {
		return this.http.post<Topic>(this.chatApiUrl, topic_object)
	}

	newMessageToSubTopicConnection(topic_label, message_id) {
		const postPayload = { 
			topic_label: topic_label
		}

		const newMessageToSubTopicConnectionApiUrl = 'https://fractal-django-prod.herokuapp.coapi/realtime/messages/' + message_id + '/new_subtopic/'

		return this.http.post<Message>(newMessageToSubTopicConnectionApiUrl, postPayload)

	}

	participateTopic(label:string) {
		console.log('participate ', label)
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
		const relatedTopicsApi = "https://fractal-django-prod.herokuapp.coapi/chatgroups/" + chatgroup_label + "/topics"
		return this.http.get<Topic[]>(relatedTopicsApi)
	}

	editTopic(label, newName, newAbout) {
		console.log("Editing the topic: " + label)

		return this.http.patch(this.chatApiUrl + label + '/', {name: newName, about: newAbout})
		
	}

	



}