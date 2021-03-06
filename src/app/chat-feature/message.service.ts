import { Topic } from './chat';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError, retry } from 'rxjs/operators';
import { Message } from './message';


@Injectable()
export class MessageService {

  private rootApiUrl = 'https://fractal-django-prod.herokuapp.com/api/realtime/messages/';
  private handleHttpError: HandleError;


  constructor(private authService: AuthService, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleHttpError = httpErrorHandler.createHandleError('MessageService');
  }

  like(id) {
    const likeApiUrl = this.rootApiUrl + id + '/like/'
    return this.http.get<Message>(likeApiUrl)
  }


  share(id) {

    const shareApiUrl = this.rootApiUrl + id + '/share/'
    return this.http.get<Message>(shareApiUrl)
    
  }

  newMessage(data) {
    return this.http.post<Message>(this.rootApiUrl, data).pipe(
      catchError(this.handleHttpError('newMessage'))
    )
  }



}
