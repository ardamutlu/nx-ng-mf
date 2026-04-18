import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AuthStore} from './auth.store';

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let queue: Array<() => void> = [];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const store = inject(AuthStore);
  const router = inject(Router);

  return next(req).pipe(
    (source) =>
      new Observable((observer) => {
        source.subscribe({
          next: (v) => observer.next(v),
          error: (err) => {
            if (err.status === 401) {
              router.navigate(['/auth/login']);
              observer.error(err);
              return;
            }

            if (err.status !== 401) {
              observer.error(err);
              return;
            }

            if (isRefreshing) {
              queue.push(() => next(req).subscribe(observer));
              return;
            }

            isRefreshing = true;

            refreshPromise =
              refreshPromise ??
              firstValueFrom(auth.refresh())
                .then(() => firstValueFrom(auth.me()))
                .then((user) => {
                  store.setUser(user);
                })
                .catch(() => {
                  store.clear();
                  router.navigate(['/auth/login']);
                })
                .finally(() => {
                  isRefreshing = false;
                  queue.forEach((cb) => cb());
                  queue = [];
                  refreshPromise = null;
                });

            refreshPromise.then(() => {
              next(req).subscribe(observer);
            });
          },
          complete: () => observer.complete(),
        });
      }),
  );
};
