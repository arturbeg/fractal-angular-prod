import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private auth:AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.auth.getAuthorizationToken();

		const authReq = req.clone({ setHeaders: { Authorization: authToken } });

		// send cloned request with header to the next handler

		return next.handle(authReq);
	}
}