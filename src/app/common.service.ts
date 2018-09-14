import { Injectable } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class CommonService {

  username: string;
  token: string;
  authenticated: boolean;


  constructor(private localSt: LocalStorageService, private http: HttpClient) { 
    
    console.log("Common Service Called")

    this.username = this.localSt.retrieve('username')
    this.token = this.localSt.retrieve('token')

    this.refreshValues();
             
  }

  refreshValues() {

    // REFRESH THE VALUES AFTER A CHANGE TO THE VARIABLES
    
    this.localSt.observe('username')
    .subscribe((value) => {
      
      this.username = value;

    }); 

    this.localSt.observe('token')
    .subscribe((value) => this.token = value)


    // this.checkAuthentication();
    this.checkAuthenticationSimple();

  }



  verifyToken(token) {

    const verifyTokenApiUrl = 'http://fractal-django-prod.herokuapp.com//api-token-verify/';

    const httpPayload = {token: this.token};

    console.log("Verifying the token");

    return this.http.post(verifyTokenApiUrl, httpPayload);

  }


  checkAuthentication() {

    if(this.token) {
      this.verifyToken(this.token).subscribe(
        data => { 
          console.log(data);
          this.authenticated = true
        },
        error => {
           console.log(error);
           this.authenticated = false
        }
      )

    } else {
      this.authenticated = false
    }

  }

  checkAuthenticationSimple() {
    if(this.token) {
      this.authenticated = true
    } else {
      this.authenticated = false
    }
  }

}
