import { CommonService } from './../../common.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } 		 from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, public commonService: CommonService) {}

	logout() {
    this.authService.logout();		
	}

}
