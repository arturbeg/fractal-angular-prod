import { NotificationsService } from './../../notifications.service';
import { Notification } from './../../shared/notifications/notification';
import { CommonService } from './../../common.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatgroup-notifications',
  templateUrl: './chatgroup-notifications.component.html',
  styleUrls: ['./chatgroup-notifications.component.scss']
})
export class ChatgroupNotificationsComponent implements OnInit {

  @Input() chatgroup_label: string;
  chatgroup_notifications: Notification[];

  constructor(private notificationService: NotificationsService) { }

  ngOnInit() {
    console.log(`The chatgroup label ${this.chatgroup_label}`);
    this.getChatGroupNotifications(this.chatgroup_label);
  }

  private getChatGroupNotifications(chatgroup_label) {
    console.log("Getting chatgroup notifications...");
    this.notificationService.getChatGroupNotifications(chatgroup_label).subscribe(
      data => {
        this.chatgroup_notifications = data['results'];
        console.log(this.chatgroup_notifications);
      }
    );
  }

}
