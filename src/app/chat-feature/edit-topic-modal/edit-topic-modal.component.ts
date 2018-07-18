import { ChatService } from './../chat.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Topic } from '../chat';
// import { ENGINE_METHOD_DIGESTS } from 'constants';


@Component({
  selector: 'app-edit-topic-modal',
  templateUrl: './edit-topic-modal.component.html',
  styleUrls: ['./edit-topic-modal.component.scss']
})
export class EditTopicModalComponent implements OnInit {

  topic: Topic
  topicForm: FormGroup;


    constructor(
      private matDialogRef: MatDialogRef<EditTopicModalComponent>, 
      
      @Inject(MAT_DIALOG_DATA) public data: any,

      private chatService: ChatService, 
      
      private fb: FormBuilder
      )
      
      {
       
        console.log(this.data.topic)

        this.topic = this.data.topic
        
        this.createEditForm()

        this.setEditFormValues()
        
      }  

  ngOnInit() {
  }

  createEditForm() {
    
    this.topicForm = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
    })
  }

  setEditFormValues() {
    
    this.topicForm.setValue({
      name: this.topic.name,
      about: this.topic.about
    })
  }

  submitChanges() {
    const val = this.topicForm.value;
    console.log(val)

    if(val.name && val.about) {
      this.chatService.editTopic(this.topic.label, val.name, val.about).subscribe()

      this.topic.name = val.name
      this.topic.about = val.about

      this.matDialogRef.close(this.topic);
      // Observable.of(this.topic)
    }


  }





}
