import { CommonService } from './../../common.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { AuthService } 		 from '../../auth.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	form: FormGroup;


	constructor(private authService:AuthService,
				private fb: FormBuilder, private commonService: CommonService) { 

        this.form = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required]
        });

	}

	login() {
		const val = this.form.value;
		console.log(val)

		if (val.username && val.password) {
			this.authService.login(val.username, val.password).subscribe();
		}
	}

}
