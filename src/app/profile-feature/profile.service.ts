import { LocalStorageService } from 'ngx-webstorage';
import { CommonService } from './../common.service';
import { Post } from './../post-feature/post';
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
	private rootApiUrl = 'https://fractal-django-prod.herokuapp.com/api/profiles/'
    private rootApiUrlUser = 'https://fractal-django-prod.herokuapp.com/rest-auth/user/'


    constructor(
        private authService: AuthService, httpErrorHandler: HttpErrorHandler, private http: HttpClient, private commonService: CommonService, private localSt: LocalStorageService) 

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
            // .map(
            //     data => {
            //         console.log(data)
            //     }
            // )
    }


    editProfile(username, newAbout) {

        console.log("Editing the profile: " + username)
        // console.log("New Username: " + newUsername + 'New About: ' + newAbout)

        // edit profile object
        return this.http.patch(this.rootApiUrl + username + '/', {about: newAbout})

    }

    editUserObject(username, newUsername) {
        // edit user object -> need to update commonService
        // change later to account for validation errors
        console.log("Patching the userObject...");
        return this.http.patch(this.rootApiUrlUser, {username: newUsername})
        // this.localSt.store('username', newUsername);
        // this.commonService.refreshValues();
    }


    getFollowers(username) {

        console.log("Getting the followers of: " + username)
        const followersApiUrl = this.rootApiUrl + username + '/followers?fromat=json'
        return this.http.get<User[]>(followersApiUrl)
                .pipe(
                    catchError(this.handleHttpError('getProfileFollowers'))
                )

    }


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

        return this.http.get<Profile>(followApiUrl)

    }
}