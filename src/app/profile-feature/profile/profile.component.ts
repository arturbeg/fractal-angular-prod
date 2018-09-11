import { ProfileNonHttpService } from './../profile-non-http.service';
import { Post } from './../../post-feature/post';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } 			 from '../profile';
import { UserService }       from '../profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Profile } from '../profile'
import { Observable } from 'rxjs/Observable';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { ChatGroupComponent }	from '../../chatgroup-feature/chatgroup/chatgroup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

	profile: Profile;
	username: string;
	posts: Post[];

	constructor(
			  private userService: UserService,
			  private route: ActivatedRoute,
			  private router: Router,
				public  authService: AuthService,
				public 	profileNonHttp: ProfileNonHttpService
			  ) { 
					this.getProfileData();
				}


	ngOnInit() {
		
	}

	getProfileData() {
			this.route.params.subscribe(params => {
				this.username = params.username;
				this.profileNonHttp.getProfile(this.username);
				this.profileNonHttp.getPosts(this.username);
		})
	}  
}
