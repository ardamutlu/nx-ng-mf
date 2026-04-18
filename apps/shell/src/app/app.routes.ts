import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { authGuard, loginGuard } from '@company/auth/data-access';
import { provideI18n } from '@company/i18n';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        providers: [provideI18n(['dashboard'])],
        loadChildren: () =>
          loadRemote<typeof import('dashboard/Routes')>(
            'dashboard/Routes',
          ).then((m) => m!.appRoutes),
      },
    ],
  },
  {
    path: 'auth',
    providers: [provideI18n(['auth'])],
    canActivate: [loginGuard],
    loadChildren: () =>
      loadRemote<typeof import('auth/Routes')>('auth/Routes').then(
        (m) => m!.appRoutes,
      ),
  },
  {
    path: '**',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@company/shared/ui').then(
            ({ NotFoundComponent }) => NotFoundComponent,
          ),
      },
    ],
  },
];
