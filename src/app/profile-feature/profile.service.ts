import { Post } from './../chat-feature/message';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap, map } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { AuthService } from '../auth.service';
import { User, Profile } from './profile';
import { ChatGroup } from '../chatgroup-feature/chatgroup'

import {Http, Response, Headers, RequestOptions} from "@angular/http";

import { Topic } from '../chat-feature/chat';


@Injectable()
export class UserService {
    
	private handleHttpError: HandleError;
	private rootApiUrl = 'http://127.0.0.1:8000/api/profiles/'
    private rootApiUrlUser = 'http://127.0.0.1:8000/rest-auth/user/'


    constructor(
        private authService: AuthService, httpErrorHandler: HttpErrorHandler, private http: HttpClient) 

    {

    	this.handleHttpError = httpErrorHandler.createHandleError('UserService');								
    }

    getProfile(username) {
    	// receives a profile object by the username
        console.log("Retreiving the user: " + username)
    	const profileApiUrl = this.rootApiUrl + username + '/'  //+ '?fromat=json'
    	return this.http.get<Profile>(profileApiUrl)
            // .map(
            //     data => {
            //         console.log(data)
            //     }
            // )

    }

    getProfilePosts(username) {
        console.log("Retreiving the posts of " + username)
        const profilePostsApiUrl = this.rootApiUrl + username + '/posts/'
        return this.http.get<Post[]>(profilePostsApiUrl)
    }

    getRecentActivityPosts(username) {
        console.log("Retreiving the recent activity posts of " + username);
        const recentActivityApiUrl = this.rootApiUrl + username + '/activity/'
        return this.http.get<Post[]>(recentActivityApiUrl)
    }


    editProfile(username, newUsername, newAbout) {

        console.log("Editing the profile: " + username)
        console.log("New Username: " + newUsername + 'New About: ' + newAbout)

        // edit profile object
        return this.http.patch(this.rootApiUrl + username + '/', {label: newUsername, about: newAbout})

        

        // this.http.patch(this.rootApiUrlUser, {username: newUsername})



    }

    editUserObject(username, newUsername) {
        // edit user object

        return this.http.patch(this.rootApiUrlUser, {username: newUsername})
    }



    deleteProfile(username) {

    }


    getFollowers(username) {

        console.log("Getting the followers of: " + username)
        const followersApiUrl = this.rootApiUrl + username + '/followers?fromat=json'
        return this.http.get<User[]>(followersApiUrl)
                .pipe(
                    catchError(this.handleHttpError('getProfileFollowers'))
                )

    }

    // getRecentActivity(username)


    getChatGroups(username) {

        console.log("Getting chatgroups of: " + username)
        const chatGroupsApiUrl = this.rootApiUrl + username + '/chatgroups/'    

        return this.http.get<ChatGroup[]>(chatGroupsApiUrl)
                        // .pipe(
                        //         catchError(this.handleHttpError('getProfileFollowers'))
                        //     )
    }

    follow(username) {

        console.log("Follow a profile: " + username)
        const followApiUrl = this.rootApiUrl + username + '/follow/'


        return this.http.get(followApiUrl)
            // .map(
            //     data => console.log(data)
            // )

    }

    verifyToken() {

        this.authService.verifyToken().subscribe()

    }


    
}



    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Content-Type':  'application/json',

    //   })
    // };



    // jwtHeaders(): object {    
    //     const httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         // 'Authorization': 'Token ' + localStorage.getItem('token'),
    //     })
    //     };
    //     return httpOptions;
    // }


                // .pipe(
                //     retry(3), // retry the failed request up to 3 times
                //     catchError(this.handleHttpError('getProfile'))    
                // );