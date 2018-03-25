import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';


import { ChatComponent } from './chat/chat.component';

import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';

import { ChatgroupComponent } from './chatgroup/chatgroup.component';

import { RecentActivityComponent } from './recent-activity/recent-activity.component';

import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  

  { path: 'chat', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chatgroup', component: ChatgroupComponent },
  { path: 'recentactivity', component: RecentActivityComponent },
  { path: 'results', component: ResultsComponent },



];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],

  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
