import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: 'snack-bar.html',
  styles: [],
})
export class SnackBar {

  text: any;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

    this.text = data;

  }
}


//-> NEEED TO FIXXX <-// 