import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationRedirectUrl'
})
export class NotificationRedirectUrlPipe implements PipeTransform {

  constructor(private router: Router) {}

  transform(notificationText, notificationData): any {
    let url = ""
    if(notificationText=="FOL" || notificationText=="FOLCG") {
      url = this.router.createUrlTree(['/profile', notificationData.sender]).toString();
    } else if(notificationText="LIK") {
      url = this.router.createUrlTree(['/chat', notificationData.message.topic_object.label]).toString();
    }
    return url
  }

}
