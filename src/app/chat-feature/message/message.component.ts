import { Profile } from './../../profile-feature/profile';
import { MessageNonHttpService } from './../message-non-http.service';
import { SnackBar } from './snack-bar';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service'
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  @Input() message: Message;

  @Input() profile: Profile;

  _subscription: any;

  constructor(private messageService: MessageService,
              public snackBar: MatSnackBar,
              public messageNonHttp: MessageNonHttpService,

              ) { 

                this._subscription = this.messageNonHttp.messageChange.subscribe(
                  (value) => {
                    if(this.message.id==value.id) {
                      this.message = value;
                    }
                  }
                )

              }

  ngOnInit() {

  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }

}


