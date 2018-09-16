import { CommonService } from './../../common.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { AuthService } 		 from '../../auth.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


	form: FormGroup;

	constructor(private authService: AuthService,
							private commonService: CommonService,
							private fb: FormBuilder) {

								this.form = this.fb.group({
									username: ['asd'],
									email: ['asd'],
									password1: ['asd'],
									password2: ['asd'],
								});

							}

	ngOnInit() {
		
	}
 

	signup() {
		const val = this.form.value;
		if(val.username && val.password1 && val.password2) {
			if(val.password1==val.password2) {
				this.authService.signup(val.username, val.email, val.password1, val.password2).subscribe(
					data => {
						console.log(data);
					}
				) 
			} else {
				console.log("passwords don't match");
			}
		}

	}


}
