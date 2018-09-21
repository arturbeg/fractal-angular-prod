import { Notification } from './shared/notifications/notification';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

  private rootNotificationsApiUrl = 'https://fractal-django-prod.herokuapp.com/api/realtime/notifications/';
  constructor(private http: HttpClient) { }

  getProfileNotifications(username) {
    console.log("Retreiving profile notifications via HTTP request...");
    const profileNotificationsApiUrl = this.rootNotificationsApiUrl + '?receiver=' + username;
    return this.http.get<Notification[]>(profileNotificationsApiUrl);
  };

  getChatGroupNotifications(chatgroup_label) {
    console.log("HTTP request -> Chatgroup notifications..");
    const chatgroupNotificationsApiUrl = this.rootNotificationsApiUrl + '?chatgroup_label='+chatgroup_label;
    return this.http.get<Notification[]>(chatgroupNotificationsApiUrl);
  }

}

