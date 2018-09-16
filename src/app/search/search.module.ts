import { ChatModule } from './../chat-feature/chat.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }          from '../material.module';
import { ChatGroupModule } from './../chatgroup-feature/chatgroup.module';
import { ProfileModule } from './../profile-feature/profile.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    SearchRoutingModule,
    ChatModule,
    ChatGroupModule,
    ProfileModule
  ],  
  declarations: [
    SearchComponent
  ],
  providers: [],

  exports: [],

  entryComponents: [ ]  
})
export class SearchModule {}