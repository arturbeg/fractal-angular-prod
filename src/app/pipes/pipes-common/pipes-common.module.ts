import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationActionPipe } from './notification-action.pipe';
import { NotificationRedirectUrlPipe } from './notification-redirect-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationActionPipe, NotificationRedirectUrlPipe],
  exports:[NotificationActionPipe, NotificationRedirectUrlPipe] 
})
export class PipesCommonModule { }
