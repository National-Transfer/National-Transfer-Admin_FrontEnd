import { ApplicationConfig,importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch,withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { authInterceptor } from './auth/auth.interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.development';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-12637298.okta.com/oauth2/default',
  clientId: '0oae6q7wvhoY28oYV5d7',
  redirectUri: environment.redirectUri + '/login/callback',
  responseType: ['token', 'id_token'],
  pkce: true,
});


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([authInterceptor])),provideAnimations(),
     provideHttpClient(withFetch()), provideHttpClient(), importProvidersFrom(OktaAuthModule.forRoot({ oktaAuth })),
    ]
};
