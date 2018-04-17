import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ProfileComponent }    from './profile/profile.component';
// import { LoginComponent }    from './login/login.component';
// import { SignupComponent }    from './signup/signup.component';
// import { ChangePasswordComponent }    from './changepassword/changepassword.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';



const sharedRoutes: Routes = [
  // { path: 'profile/:username', component: ProfileComponent }, // add username later
  { path: '', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', component: PageNotFoundComponent },


  // { path: 'signup', component: SignupComponent },
  // { path: 'changepassword', component: ChangePasswordComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(sharedRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SharedRoutingModule { }