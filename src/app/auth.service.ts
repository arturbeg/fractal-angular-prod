import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { finalize, tap, map} from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import {Subject} from 'rxjs/Subject';



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
    private restAuthUrlVerifyToken = 'https://fractal-django-prod.herokuapp.com/api-token-verify/';
    private handleHttpError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {

        this.handleHttpError = httpErrorHandler.createHandleError('AuthService'); 
        
        this.isAuthenticated();

    }

    verifyToken() {

       return this.http.post(this.restAuthUrlVerifyToken, {token: localStorage.getItem('token')})
           .map(
               data => console.log(data)
            )

    }


    login(username: string, password: string) {

        return this.http.post(this.restAuthUrlLoginNew, JSON.stringify({ username: username, password: password }))
                    .map(
                        data => {
                            
                            localStorage.setItem('token', data['token'])

                            if (localStorage.getItem('token')) {
                                localStorage.setItem('username', username)
                            }

                            this.isAuthenticated();

                            
                        
                        },
                    )         
        }


    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.isAuthenticated();
    }


    isAuthenticated() {
        if (localStorage.getItem('token')) {
            this.authenticated = true
            this.username = localStorage.getItem('username')
            this.authenticatedChange.next(this.authenticated)

            return true

        } else {
            this.authenticated = false
            this.authenticatedChange.next(this.authenticated)

            return false
        };
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

    public getAuthToken() {
        return localStorage.getItem('token')
    }

} 