import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { AppComponent } from "./app.component";

import { environment } from "../environments/environment";
import { MsalGuard, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication } from "@azure/msal-browser";

export const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [MsalGuard] },

  { path: 'auth', component: MsalRedirectComponent },     // Needed for handling redirect after login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
