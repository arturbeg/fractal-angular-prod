import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

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
	@Output() isAuthorised = new EventEmitter<boolean>();




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
			if (localStorage.getItem('username')) {
				console.log("Successfully logged in!")
				this.isAuthorised.emit(true)
			}	else {
				console.log("Something went wrong..")
				this.isAuthorised.emit(false)
			}
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
