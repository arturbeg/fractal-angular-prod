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


  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
					
    this.handleHttpError = httpErrorHandler.createHandleError('ChatService');								
    
	}  
  
	getTopic(label: string) {

		return this.http.get<Topic>(this.chatApiUrl + label + '/')

	}

	getMessages(label:string) {
		// http://127.0.0.1:8000/api/realtime/messages/?topic=new
		const messagesListApiUrl = 'http://127.0.0.1:8000/api/realtime/messages/?topic=' + label
		return this.http.get<Message[]>(messagesListApiUrl)
	}


	deleteTopic(label:string) {
		// delete the topic
		return this.http.delete(this.chatApiUrl + label + '/')
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