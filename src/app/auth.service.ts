import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { finalize, tap, map} from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';



@Injectable()
export class AuthService {

    
    private restAuthUrlLogin = 'http://127.0.0.1:8000/rest-auth/login/';
    private restAuthUrlLogout = 'http://127.0.0.1:8000/rest-auth/logout/';
    private restAuthUrlSignup = 'http://127.0.0.1:8000/rest-auth/registration/';
    private restAuthUrlChangePassword = 'http://127.0.0.1:8000/rest-auth/password/change/';
    private restAuthUrlLoginNew = 'http://127.0.0.1:8000/api/auth/token/';
    private restAuthUrlVerifyToken = 'http://127.0.0.1:8000/api-token-verify/';
    private handleHttpError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {

        this.handleHttpError = httpErrorHandler.createHandleError('AuthService');                                

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

                            
                        
                        },
                    )

            
    }


    public logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }


    isAuthenticated(): boolean {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
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





    
// const httpOptions = {
//     headers: new HttpHeaders({
//     'Accept': 'application/json',
//     'Content-Type':  'application/json',
//     })
// };

// const httpOptions = {
//     headers: new HttpHeaders({
//     'Accept': 'application/json',
//     'Content-Type':  'application/json',
//     'Authorization': localStorage.getItem('token')

//     })
// };
    // private setSession(authResult) {
    //     // localStorage.setItem('id_token', authResult.idToken);
    //     // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    //     localStorage.setItem('token', authResult.token)

    // }

    // login(email:string, password:string ) {
    //     return this.http.post<User>('/api/login', {email, password})
    //         // this is just the HTTP call, 
    //         // we still need to handle the reception of the token
    //         .shareReplay();
    // }


    // public login(username:string, password:string) {
    //     console.log("User login");
    //     return this.http.post(this.restAuthUrlLogin, { username: username, email: "", password: password }, httpOptions)
    //                 .map(

    //                     data => localStorage.setItem('token', data['token'])

    //                 )
    // }  