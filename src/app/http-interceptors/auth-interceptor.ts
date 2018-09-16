import { CommonService } from './../common.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService:AuthService, private commonService: CommonService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
		
		if(this.commonService.token) {

			const authReq = req.clone({
				headers: req.headers.append('Authorization', 'JWT ' + this.commonService.token)
			})

			return next.handle(authReq)

		} else {
			return next.handle(req)
		}

	}
}