import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError, retry } from 'rxjs/operators';
import { Message } from './message'

@Injectable()
export class MessageService {

  private rootApiUrl = 'http://127.0.0.1:8000/api/realtime/messages/';
  private handleHttpError: HandleError;


  constructor(private authService: AuthService, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleHttpError = httpErrorHandler.createHandleError('MessageService');
  }

  like(id) {
    const likeApiUrl = this.rootApiUrl + id + '/like/'
    return this.http.get(likeApiUrl)
  }


  share(id) {

    const shareApiUrl = this.rootApiUrl + id + '/share/'
    return this.http.get(shareApiUrl)
    
  }

  newMessage(text: string, topicLabel: string, userId: number) {

    var messageObject = {
      text: text,
      topic: topicLabel,
      user: userId,
    }
    return this.http.post<Message>(this.rootApiUrl, messageObject).pipe(
      catchError(this.handleHttpError('newMessage'))
    )

  }



}
