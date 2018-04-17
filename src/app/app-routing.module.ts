import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // { path: '', component: HomeComponent },
  // { path: 'results', component: ResultsComponent },
  // { path: '**', component: PageNotFoundComponent },
  //{ path: 'chat', component: ChatComponent }, // chat has 2 parameters (type and label) -> later can merge them
  //{ path: 'profile/:username', component: ProfileComponent },
  //{ path: 'recentactivity', component: RecentActivityComponent },
 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
        routes,
        { enableTracing: true } // <-- debugging purposes only
      ),
  ],

  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
