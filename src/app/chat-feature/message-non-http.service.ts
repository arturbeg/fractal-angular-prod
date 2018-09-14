import { SnackBar } from './message/snack-bar';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Message } from './message';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class MessageNonHttpService {

  messageChange: Subject<Message> = new Subject<Message>();

  constructor(public messageService: MessageService,
              public snackBar: MatSnackBar) { }

  like(id) {
    this.messageService.like(id).subscribe(
      data => {
        this.messageChange.next(data)
      }
    )
  }

  share(id) {
    this.messageService.share(id).subscribe(
      data => {
        this.messageChange.next(data)
        if(data.shared) {
          this.openSnackBar("Message successfully shared!")
        } else {
          this.openSnackBar("Message unshared..")
        }
      }
    )
  }

  showSubtopics(subtopics) {

    this.openSnackBarSubtopics(subtopics);

  }

  openSnackBar(text) {
    this.snackBar.openFromComponent(SnackBar, {
      duration: 500,
      data: {
        text:text
      }
    });
  }

  openSnackBarSubtopics(subtopics) {
    this.snackBar.openFromComponent(SnackBar, {
      duration: 4000,
      data: {
        subtopics: subtopics
      }

    })
  }


}
