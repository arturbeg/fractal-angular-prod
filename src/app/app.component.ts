import { UserService } from './profile-feature/profile.service';
import { CommonService } from './common.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app';

  constructor(private localSt: LocalStorageService,
              private commonService: CommonService,
              private userService: UserService) {}

  ngOnDestroy() {
    this.localSt.clear('currentTopic');
    alert("BYEEE");
  }

}
