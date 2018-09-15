import { CommonService } from './../../common.service';
import { Component, OnInit } from '@angular/core';
import { ChatGroupService } from './../../chatgroup-feature/chatgroup.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ChatGroup} from './../../chatgroup-feature/chatgroup';


@Component({
  selector: 'app-new-chatgroup-root',
  templateUrl: './new-chatgroup-root.component.html',
  styleUrls: ['./new-chatgroup-root.component.scss']
})
export class NewChatgroupRootComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private chatgroupService: ChatGroupService,
              private commonService: CommonService) {

                if(this.commonService.authenticated) {
                
                this.form = this.fb.group({
                  name: ['',Validators.required],
                  about: [''],
                });

                } else {
                  this.router.navigate(['/login'])
                }

               }

  ngOnInit() {
  }

  submit() {
    const val = this.form.value;
    if(val.name) {
      const chatgroup_object = {
        name: val.name,
        about: val.about
      }

      this.chatgroupService.newChatGroup(chatgroup_object).subscribe(
        data => {
          this.router.navigate(['/chatgroup', data.label])
        }
      )

    }
  }

}
