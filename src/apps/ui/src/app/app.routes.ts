import { Route } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Route[] = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];
