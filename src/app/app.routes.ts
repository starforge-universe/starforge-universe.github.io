import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StarforgeSurveySwaggerComponent } from './components/starforge-survey-swagger/starforge-survey-swagger.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'starforge-survey-swagger', component: StarforgeSurveySwaggerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
