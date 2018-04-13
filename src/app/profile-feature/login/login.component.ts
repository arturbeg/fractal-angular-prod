import { Component, OnInit } from '@angular/core';

import { AuthService } 		 from '../../auth.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	// username: string;
	// password: string;

	form: FormGroup;

	constructor(private authService:AuthService,
				private fb: FormBuilder) { 

        this.form = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required]
        });

	}

	login() {
		const val = this.form.value;
		console.log(val)

		if (val.username && val.password) {
			this.authService.login(val.username, val.password).subscribe()	
		}
	}


	getToken() {
		return this.authService.getAuthToken()
	}




	// ngOnInit() {

	// }



	// onSubmit() {
	// 	this.authService.login(this.username, this.password).subscribe()
	// }

	// getToken() {
	// 	return this.authService.getAuthToken()
	// }

}
