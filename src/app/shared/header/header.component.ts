import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } 		 from '../../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit, OnDestroy {

  authenticated: boolean;
  username: string; // <- if exists, the user is authorised
  _subscription: any;


  constructor(private authService: AuthService) {

    this.authenticated = this.authService.isAuthenticated();
    this.username = this.authService.username;
    this._subscription = this.authService.authenticatedChange.subscribe((value) => { 
      console.log("Applying the change to the value of authenticated")
      console.log(value)

      if (value==true) {
        this.username = this.authService.username;
        this.authenticated = true;
      } else {
        this.authenticated = false;
        this.username = '';
      }
     
    });


   }

   ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }


  ngOnInit() {

    // if (localStorage.getItem('username')) {
    //   this.username = localStorage.getItem('username');
    //   this.authenticated = true;
    // } else {
    //   this.authenticated = false;
    // }

  }

	logout() {
    this.authService.logout();		
    // this.authenticated = false;
    // this.username = "";
	}


}
