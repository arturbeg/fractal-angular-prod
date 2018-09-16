import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { finalize, tap, map} from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import {Subject} from 'rxjs/Subject';

import {LocalStorageService} from "ngx-webstorage";


@Injectable()
export class AuthService {

    authenticated: boolean;
    username: string;

    authenticatedChange: Subject<boolean> = new Subject<boolean>();

    private restAuthUrlLogin = 'https://fractal-django-prod.herokuapp.com/rest-auth/login/';
    private restAuthUrlLogout = 'https://fractal-django-prod.herokuapp.com/rest-auth/logout/';
    private restAuthUrlSignup = 'https://fractal-django-prod.herokuapp.com/rest-auth/registration/';
    private restAuthUrlChangePassword = 'https://fractal-django-prod.herokuapp.com/rest-auth/password/change/';
    private restAuthUrlLoginNew = 'https://fractal-django-prod.herokuapp.com/api/auth/token/';
    private handleHttpError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private localSt: LocalStorageService, private commonService: CommonService, private router: Router) {

        this.handleHttpError = httpErrorHandler.createHandleError('AuthService'); 
        
        // this.isAuthenticated();

    }


    login(username: string, password: string) {

        return this.http.post(this.restAuthUrlLoginNew, JSON.stringify({ username: username, password: password }))
                    .map(
                        data => {

                            this.localSt.store('token', data['token'])

                            if (this.commonService.token) {
                               this.localSt.store('username', username)
                               console.log("Successfully logged in!")
                               this.router.navigate(['/profile', username]);
                            } else {
                               console.log("ERROR IN LOGIN")
                            }

                            // temporary before everything is an Observable
                            this.commonService.refreshValues();
                        },
                    )         
        }


    public logout(): void {
        console.log("LOG OUT!!!")
        this.localSt.clear("token");
        this.localSt.clear("username");
        
        this.commonService.refreshValues();

        this.router.navigate(['/login'])
    }

    public signup(username:string, email: string, password1: string, password2: string) {
        console.log("Sign Up")
        var signupObject = {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }
        return this.http.post(this.restAuthUrlSignup, signupObject).pipe(
                //retry(1), // retry the failed request once
                catchError(this.handleHttpError('signup'))
            )
    }

    public changePassword(new_password1: string, new_password2: string) {

        console.log("Change Password")
        var changePasswordObject = {
            new_password1: new_password1,
            new_password2: new_password2,
        }

        return this.http.post(this.restAuthUrlChangePassword, changePasswordObject).pipe(
            catchError(this.handleHttpError('changepassword'))
        )


    }

} 