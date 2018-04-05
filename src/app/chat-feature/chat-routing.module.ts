import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent }    from './chat/chat.component';

const chatRoutes: Routes = [
  { path: 'chat', component: ChatComponent }, // add chat type and label later
];


@NgModule({
  imports: [
    RouterModule.forChild(chatRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }