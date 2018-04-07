import { Component, OnInit } from '@angular/core';
import { AuthService } 		 from '../../auth.service';



@Component({
  selector: 'app-sichangepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {

	new_password1: string;
	new_password2: string;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		
	}

	onSubmit() {

		this.authService.changePassword(this.new_password1, this.new_password2).subscribe(
			data => console.log(data)
		)

	}
}
