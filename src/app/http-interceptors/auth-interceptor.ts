import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService:AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
		// console.log("Auth Interceptor...")
		// const authToken = this.authService.getAuthToken();
		// const authReq = req.clone({ setHeaders: { Authorization: authToken } });
		// return next.handle(authReq);

		const token = localStorage.getItem('token');
		if (token) {
			const cloned = req.clone( {
				headers: req.headers.set("Authorization", 
					"Bearer" + token)
			});

			return next.handle(cloned);
		}

		else {

			next.handle(req);
		}
	}
}