import { Component, OnInit, Input } from '@angular/core';
import { AuthService } 		 from '../../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  @Input()isAuthorised: boolean;
  @Input()username: string; // <- if exists, the user is authorised


  constructor(private authService: AuthService) { }


  ngOnInit() {

    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      this.isAuthorised = true;
    } else {
      this.isAuthorised = false;
    }

  }

	logout() {
    this.authService.logout();		
    this.isAuthorised = false;
    this.username = "";
	}


}
