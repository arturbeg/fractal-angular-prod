// "Barrel" of Http Interceptors

import { HTTP_INTERCEPTORS } 	from '@angular/common/http';
import { ContentTypeInterceptor } 		from './content-type-interceptor';
import { AuthInterceptor } 		from './auth-interceptor';
import { TrimNameInterceptor }  from './trim-name-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
// Http interceptor providers in outside-in order

export const httpInterceptorProviders = [
	// the purpose of the provide statement..
	
	// {provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true},
	{ provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	// {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },

]