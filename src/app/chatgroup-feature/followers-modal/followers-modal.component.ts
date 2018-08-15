import { Profile } from './../../profile-feature/profile';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss']
})
export class FollowersModalComponent implements OnInit {

  followers: Profile[];

  constructor(private matDialogRef: MatDialogRef<FollowersModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              
              ) {  
                this.followers = this.data.followers
              }

  ngOnInit() {
    
  }

  getFollowers() {
    this.followers = this.data.followers
  }

}
