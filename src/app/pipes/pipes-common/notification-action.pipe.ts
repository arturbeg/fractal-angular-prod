import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationAction'
})
export class NotificationActionPipe implements PipeTransform {

  notification_actions = {
    "FOL":"followed you",
    "LIK":"liked your message",
    "FOLCG": "followed your chatgroup"
  }

  transform(value: string): string {
    let notification_action = "";
    notification_action = this.notification_actions[value];
    console.log(notification_action);
    return notification_action
  }

}
