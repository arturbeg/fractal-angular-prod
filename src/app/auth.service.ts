import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { finalize, tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class AuthService {
    public token = '';
    private restAuthUrlLogin = 'http://localhost:8000/rest-auth/login/';
    private restAuthUrlLogout = 'http://localhost:8000/rest-auth/logout/';
    private restAuthUrlSignup = 'http://localhost:8000/rest-auth/registration/';
    private restAuthUrlChangePassword = 'http://localhost:8000/rest-auth/password/change';
    
    private handleHttpError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {

        this.handleHttpError = httpErrorHandler.createHandleError('AuthService');                                

    }

    public login(username:string, password:string) {
        console.log("User login");
        return this.http.post(this.restAuthUrlLogin, { username: username, email: "", password: password }, httpOptions)
                    .map(
                        data => this.token = data['token']
                        );
    }

    public logout(): void {
        this.token = "";
        console.log("User logged out")
    }


    public signup(username:string, email: string, password1: string, password2: string) {
        console.log("Sign Up")
        var signupObject = {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }
        return this.http.post(this.restAuthUrlSignup, signupObject, httpOptions).pipe(
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

        return this.http.post(this.restAuthUrlChangePassword, changePasswordObject, httpOptions).pipe(
            catchError(this.handleHttpError('changepassword'))
        )


    }


    public getAuthToken() {
        return this.token
    }

}    