import { FactoryProvider } from '@angular/core';
import { MsalGuardConfiguration, MsalInterceptorConfiguration, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { IPublicClientApplication, PublicClientApplication, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MsalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: '/auth'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    }
  });
}

export function MsalGuardConfigFactory(): MsalGuardConfiguration {
  return { interactionType: InteractionType.Redirect };
}

export function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>();
  protectedResourceMap.set('/api*', [environment.authConfig.apiScope]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export const MsalInstanceProvider: FactoryProvider = {
  provide: MSAL_INSTANCE,
  useFactory: MsalInstanceFactory
};

export const MsalGuardConfigProvider: FactoryProvider = {
  provide: MSAL_GUARD_CONFIG,
  useFactory: MsalGuardConfigFactory
};

export const MsalInterceptorConfigProvider: FactoryProvider = {
  provide: MSAL_INTERCEPTOR_CONFIG,
  useFactory: MsalInterceptorConfigFactory
};
