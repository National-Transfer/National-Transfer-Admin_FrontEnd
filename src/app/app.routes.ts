import { Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: 'login/callback', component: OktaCallbackComponent, canActivate : [authGuard] },
    {
        path: '',
        loadChildren: () => import('./components/routes').then((m) => m.APP_ROUTES),canActivate: [OktaAuthGuard]
    },

];
