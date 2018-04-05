import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecentActivityComponent }    from './recent-activity/recent-activity.component';

const profileRoutes: Routes = [
  { path: 'recentactivity', component: RecentActivityComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostRoutingModule { }