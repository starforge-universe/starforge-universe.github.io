import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInstanceProvider, MsalGuardConfigProvider, MsalInterceptorConfigProvider } from './msal-settings.provider';
import { MsalService, MsalGuard, MsalBroadcastService, MsalInterceptor, MsalRedirectComponent } from '@azure/msal-angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalInstanceProvider,
    MsalGuardConfigProvider,
    MsalInterceptorConfigProvider,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})

export class AppModule { }

