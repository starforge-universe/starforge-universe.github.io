import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StarforgeSurveySwaggerComponent } from './components/starforge-survey-swagger/starforge-survey-swagger.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'starforge-survey-swagger', component: StarforgeSurveySwaggerComponent }
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
