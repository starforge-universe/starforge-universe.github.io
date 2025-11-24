import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './components/app.component';

import { MsalInstanceProvider, MsalGuardConfigProvider, MsalInterceptorConfigProvider } from './msal-settings.provider';
import { MsalService, MsalGuard, MsalBroadcastService, MsalInterceptor, MsalRedirectComponent } from '@azure/msal-angular';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppComponent,
  ],
  providers: [
    provideHttpClient(),
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

