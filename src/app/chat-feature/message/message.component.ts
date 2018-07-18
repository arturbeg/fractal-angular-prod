import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service'


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  


  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }


  // later retreive the updated likers count
  like(id) { 
    this.messageService.like(id).subscribe(
      data => { 
        console.log(data)
        if(data['status']=="message liked") {
          this.message.likers_count++
        } else {
          this.message.likers_count--          
        }
      }
    )
  }
  
  
  share(id) {
    this.messageService.share(id).subscribe(
      data => {
        console.log(data)
      }
    )
  }

}
