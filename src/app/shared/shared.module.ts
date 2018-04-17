// Angular Modules
import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { MaterialModule }          from '../material.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';
import { SharedRoutingModule } from './shared-routing.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedRoutingModule
  ],
  declarations: [

    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResultsComponent

  ],
  providers: [],

  exports: [
      HeaderComponent
    ],

  entryComponents: []  
})
export class SharedModule {}