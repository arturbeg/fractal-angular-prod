import { ChatGroup } from './../chatgroup';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-chatgroup-card',
  templateUrl: './chatgroup-card.component.html',
  styleUrls: ['./chatgroup-card.component.scss']
})
export class ChatGroupCardComponent {

  @Input() chatgroup: ChatGroup;

  constructor() { }

}
