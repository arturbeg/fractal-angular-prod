import { ChatGroup } from './../chatgroup-feature/chatgroup';
import { Profile } from './../profile-feature/profile';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {
  
  profiles: Profile[];
  chatgroups: ChatGroup[];
  showProfiles: boolean = false;
  showChatGroups: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public matDialogRef: MatDialogRef<CommonModalComponent>) { 
                if(data.chatgroups) {
                  this.chatgroups = data.chatgroups;
                  this.showChatGroups = true;
                }

                if(data.profiles) {
                  this.profiles = data.profiles;
                  console.log(this.profiles);
                  this.showProfiles = true;
                }
              }

  ngOnInit() {
  }

}
