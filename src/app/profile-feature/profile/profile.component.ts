import { Component, OnInit } from '@angular/core';
import { User } 			 from '../profile';
import { UserService }       from '../profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Profile } from '../profile'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

	profile$: Observable<Profile>;

	constructor(
			  private userService: UserService,
			  private route: ActivatedRoute,
			  private router: Router
			  ) { }


	ngOnInit() {


	}

	getProfile() {

		this.profile$ = this.route.paramMap
			.switchMap((params: ParamMap) => this.userService.getProfile(params.get('username')));
	}


  
}
