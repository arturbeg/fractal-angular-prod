import { Component, OnInit } from '@angular/core';

import { AuthService } 		 from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	username: string;
	password: string;

	constructor(private authService:AuthService) { }

	ngOnInit() {

	}

	onSubmit() {
		this.authService.login(this.username, this.password).subscribe()
	}

	getToken() {
		return this.authService.getAuthToken()
	}

}
