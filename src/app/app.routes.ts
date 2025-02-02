import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { MsalGuard, MsalRedirectComponent } from "@azure/msal-angular";

export const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [MsalGuard] },
  { path: 'auth', component: MsalRedirectComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
