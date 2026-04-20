import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LOADING_KEY, LoadingService } from '@company/core';
import { AuthStore } from './auth.store';
import { PassportStrategy } from './auth.model';
import { AUTH_KEYS } from './auth.token';

// @ts-ignore
const API_URL = `${process.env.API_URL}/auth`;
const REQUEST_OPTIONS = { withCredentials: true };

@Injectable({ providedIn: 'root' })
export class AuthService {
  loading = inject(LoadingService);
  http = inject(HttpClient);
  router = inject(Router);
  authStore = inject(AuthStore);

  loginWithProvider(provider: PassportStrategy): void {
    this.loading.start(AUTH_KEYS.login);
    window.location.href = `${API_URL}/${provider}`;
  }

  me() {
    return this.http.get(`${API_URL}/me`, {
      ...REQUEST_OPTIONS,
      context: new HttpContext().set(LOADING_KEY, AUTH_KEYS.me),
    });
  }

  refresh() {
    return this.http.post(
      `${API_URL}/refresh`,
      {},
      {
        ...REQUEST_OPTIONS,
        context: new HttpContext().set(LOADING_KEY, AUTH_KEYS.refresh),
      },
    );
  }

  logout() {
    return this.http
      .post(
        `${API_URL}/logout`,
        {},
        {
          ...REQUEST_OPTIONS,
          context: new HttpContext().set(LOADING_KEY, AUTH_KEYS.logout),
        },
      )
      .pipe(
        tap(() => {
          this.authStore.clear();
          this.router.navigate(['/auth/login']);
        }),
      );
  }
}
