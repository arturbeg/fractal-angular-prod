import { CommonService } from './../../common.service';
import { NotificationsService } from './../../notifications.service';
import { Component, OnInit } from '@angular/core';
import { Notification } from './notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[];

  constructor(private notificationsService: NotificationsService,
              private commonService: CommonService) { 
                console.log("Notifications Component is created..")
              }

  ngOnInit() {
    this.getNotifications(this.commonService.username)
  }

  private getNotifications(username) {
    this.notificationsService.getProfileNotifications(username).subscribe(
      data => {
        this.notifications = data['results'];
        console.log(this.notifications);
      }
    )
  }

}
