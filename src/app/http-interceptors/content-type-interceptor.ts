import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';




@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
	
		const contentTypeReq = req.clone({
			headers: req.headers.set('Content-Type', 'application/json')
		})

		return next.handle(contentTypeReq)

	}
}