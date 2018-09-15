import { Router } from '@angular/router';
import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: 'snack-bar.html',
  styles: ['./message.component.scss'],
})
export class SnackBar {

  text: any;
  subtopics: string[]

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public router: Router) 
              {

    if(data.text) {
      this.text = data.text;
    } 

    if(data.subtopics) {
      this.subtopics = data.subtopics;
    }


  }
}


//-> NEEED TO FIXXX <-// 