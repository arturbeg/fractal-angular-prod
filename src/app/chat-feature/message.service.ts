import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class MessageService {

  private rootApiUrl = 'http://localhost:8000/api/realtime/messages/';
  private handleHttpError: HandleError;


  constructor(private authService: AuthService, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleHttpError = httpErrorHandler.createHandleError('MessageService');
  }

  like(id) {
    const likeApiUrl = this.rootApiUrl + id + '/like/'
    return this.http.get(likeApiUrl)
  }

  newMessage(text: string, topicId: number) {

    var messageObject = {
      text: text,
      topic: topicId
    }
    return this.http.post(this.rootApiUrl, messageObject).pipe(
      catchError(this.handleHttpError('newMessage'))
  )

  }


}
