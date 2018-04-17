import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatGroupComponent }    from './chatgroup/chatgroup.component';

const chatgroupRoutes: Routes = [
  { path: 'chatgroup/:label', component: ChatGroupComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(chatgroupRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatGroupRoutingModule { }