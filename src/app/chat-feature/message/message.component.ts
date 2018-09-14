import { NewTopicComponent } from './../new-topic/new-topic.component';
import { Profile } from './../../profile-feature/profile';
import { MessageNonHttpService } from './../message-non-http.service';
import { SnackBar } from './snack-bar';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service'
import { MatSnackBar, TooltipPosition } from '@angular/material';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  @Input() message: Message;

  @Input() profile: Profile;

  subtopics: string[];

  tooltipPosition: TooltipPosition = 'below'

  _subscription: any;


  constructor(private messageService: MessageService,
              public snackBar: MatSnackBar,
              public messageNonHttp: MessageNonHttpService,
              private dialog: MatDialog
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

  newSubtopic() {
    console.log("New Subtopic");

    const dialogRef = this.dialog.open(NewTopicComponent, {
      data: {'message_id': this.message.id},
      height: '500px',
      width: '500px'
    }); 
    
    // dialogRef.afterClosed().subscribe()

  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }

}


 