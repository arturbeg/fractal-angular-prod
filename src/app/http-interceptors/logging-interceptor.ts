import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { finalize, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

	constructor(private messenger: MessageService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {

		const started = Date.now()
		let ok: string

		// extend servier response observable with logging

		return next.handle(req)
			// how do we get the HttpReponse at this stage?
			.pipe(

				tap(
					event => ok = event instanceof HttpResponse  ? 'succeeded': '',
					error => ok = 'failed'
				),

				finalize(() => {
					const elapsed = Date.now() - started;
					const msg = `${req.method} "${req.urlWithParams}"
            		${ok} in ${elapsed} ms.`;
          			this.messenger.add(msg); 

				})


			)
	}
}
