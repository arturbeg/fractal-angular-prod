import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent }    from './profile/profile.component';

const profileRoutes: Routes = [
  { path: 'profile', component: ProfileComponent }, // add username later
];


@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }