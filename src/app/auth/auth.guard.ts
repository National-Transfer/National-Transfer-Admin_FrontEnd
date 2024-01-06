import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let oktaAuth = inject(OKTA_AUTH);

  let roles$!: Observable<any>;
  const oktaAuthStateService = inject(OktaAuthStateService);

  roles$ = oktaAuthStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    map((authState: AuthState) => authState.accessToken?.claims['groups'] ?? '')
  );

  console.log('inside guard');
  
  roles$.subscribe((roles: string[]) => {
    const isAdmin = roles.includes('ADMIN');
    if (!isAdmin) {
      oktaAuth.signOut();
    }
  });

  if(state.url == ""){ return true;}

    return true;
};
