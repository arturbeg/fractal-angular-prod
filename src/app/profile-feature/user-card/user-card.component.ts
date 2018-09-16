import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Profile } from './../profile'
import { ProfileNonHttpService } from './../profile-non-http.service'
import { CommonService } from './../../common.service'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() profile: Profile;
  profileChanges: any;

  constructor(public profileNonHttp: ProfileNonHttpService,
              public commonService: CommonService) { 
                this.profileChanges = this.profileNonHttp.profileChanges.subscribe(
                  data => {
                    if(this.profile.id==data.id) {
                      this.profile = data;
                    };
                  }
                )
              }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.profileChanges.unsubscribe();
  }

}
