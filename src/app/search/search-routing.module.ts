import { PageNotFoundComponent } from './../shared/not-found/not-found.component';
import { SearchComponent } from './search.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const searchRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule { }


