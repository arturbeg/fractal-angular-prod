import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ChatGroupInterface } from './chatgroup';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token' 
  })
};


@Injectable()
export class ChatGroupService {


	chatgroupApiUrl = ''; // url to web api
	private handleHttpError: HandleError;


  	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
					
		this.handleHttpError = httpErrorHandler.createHandleError('ChatGroupService');								
	}

	

	addChatGroup (chatgroup: ChatGroupInterface): Observable<ChatGroupInterface> {
	return this.http.post<ChatGroupInterface>(this.chatgroupApiUrl, chatgroup, httpOptions)
	  .pipe(
	    catchError(this.handleHttpError('addChatGroup', chatgroup))
	  );
	}

	getChatGroup() {

		return this.http.get<ChatGroupInterface>(this.chatgroupApiUrl)
				.pipe(
					retry(3), // retry the failed request up to 3 times
					catchError(this.handleError)	
				);
	}

	private handleError(error: HttpErrorResponse) {
		if(error.error instanceof ErrorEvent) {
			// A client-side or network error occured
			// Handle accordingly

			console.error('An error occured: ', error.error.message);

		} else {
			// The backend returned an unsuccessful response code
			// The response body may contain 

			console.error(
      		`Backend returned code ${error.status}, ` +
      		`body was: ${error.error}`);
  				}			

  		return new ErrorObservable('Something went wrong; please try again later.')		
		}
	}



/*

// Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const locations = new Observable((observer) => {
  // Get the next and error callbacks. These will be passed in when
  // the consumer subscribes.
  const {next, error} = observer;
  let watchId;

  // Simple geolocation API check provides values to publish
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(next, error);
  } else {
    error('Geolocation not available');
  }

  // When the consumer unsubscribes, clean up data ready for next subscription.
  return {unsubscribe() { navigator.geolocation.clearWatch(watchId); }};
});

// Call subscribe() to start listening for updates.
const locationsSubscription = locations.subscribe({
  next(position) { console.log('Current Position: ', position); },
  error(msg) { console.log('Error Getting Location: ', msg); }
});

// Stop listening for location after 10 seconds
setTimeout(() => { locationsSubscription.unsubscribe(); }, 10000);

*/



/* Practice

// Simple observable that emits 3 values
const myObservable = Observable.of(1,2,3);

// Create observer object

const myObserver = {

	next: x => console.log(x),
	error: err => console.log(err),
	complete: () => console.log("complete")
}

// Execute with the observer object

myObservable.subscribe(myObserver)




// This function runs when subscribe() is called

function sequenceSubscriber(observer) {
	// Sync deliver 1, 2, 3, then complete
	observer.next(1);
	observer.next(2);
	observer.next(3);
	observer.complete();

	// unsub func doesn't need to do anything
	// because values are delibered sync

	return { unsubscribe() {} };
}


// Create the new Observable that will deliver the
// above sequence

const sequence = new Observable(sequenceSubscriber);

// execute the Observable and print the result of each
// notification

sequence.subscribe({
	next(num) {
		console.log(num)
	},

	complete() {
		console.log("finish")
	}
});



function sequenceSuscriber(observer) { 
	const seq = [1,2,3]
	let timeoutId;


	// Run through an array of numbers -> emitting
	// 1 value per second

	function doSequence(arr, idx) {
		timeoutId = setTimeout(() => {
			observer.next(arr[idx]);
			if (idx === arr.length - 1) {
				observer.complete();
			}
			else {
				doSequence(arr, idx++);
			}
		}, 1000)
	}

	doSequence(seq, 0)

	// Unsubscribe should clear the timeout to stop execution
	return {unsubscribe() {
		clearTimeout(timeoutId)
	}};

}


// Create a new Observable that will deliver the above
// sequence

const sequence = new Observable(sequenceSuscriber);

sequence.subscribe({
  next(num) { console.log(num); },
  complete() { console.log('Finished sequence'); }

});



// Create a multicast subscriber

function multicastSequenceSuscriber() {
	const seq = [1,2,3]

	// Keep track of each observer
	const observers = [];

	// There will be one set of values generated
	// multicasted to each subscriber

	let timeoutId;

	
}
*/

