import { Route } from '@angular/router';
import { AuthLayout } from './layout/auth-layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadComponent: () =>
          import('@company/auth/feature-login').then(
            ({ FeatureLogin }) => FeatureLogin,
          ),
      },
    ],
  },
];
