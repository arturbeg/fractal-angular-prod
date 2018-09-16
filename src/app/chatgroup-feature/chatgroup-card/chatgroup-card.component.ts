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

  constructor(private chatGroupNonHttpService: ChatgroupNonHttpService) {
    this.chatgroupChanges.subscribe(
      data => {
        if(this.chatgroup.id==data.id) {
        this.chatgroup = data;
        }
      }
    )
  }
}
