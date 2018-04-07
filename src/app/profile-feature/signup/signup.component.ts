import { Component, OnInit } from '@angular/core';
import { AuthService } 		 from '../../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	// turn into a signup object
	username: string;
	email: string;
	password1: string;
	password2: string;


	constructor(private authService: AuthService) { }

	ngOnInit() {
		
	}

	onSubmit() {

		this.authService.signup(this.username, this.email, this.password1, this.password2).subscribe(
			data => console.log(data)
		)

	}


}
