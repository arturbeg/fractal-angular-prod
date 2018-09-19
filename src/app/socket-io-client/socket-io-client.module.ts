import { SocketService } from './socket.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [SocketService]
})

export class SocketIoClientModule { }
