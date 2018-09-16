import { ChatGroup } from './../chatgroup';
import { Component, Input } from '@angular/core';
import { ChatgroupNonHttpService } from './../chatgroup-non-http.service'



@Component({
  selector: 'app-chatgroup-card',
  templateUrl: './chatgroup-card.component.html',
  styleUrls: ['./chatgroup-card.component.scss']
})
export class ChatGroupCardComponent {

  @Input() chatgroup: ChatGroup;
  chatgroupChanges: any;

  constructor(public chatGroupNonHttpService: ChatgroupNonHttpService) {
    this.chatGroupNonHttpService.chatgroup.subscribe(
      data => {
        if(this.chatgroup.id==data.id) {
          this.chatgroup = data;
        }
      }
    )
  }
}
