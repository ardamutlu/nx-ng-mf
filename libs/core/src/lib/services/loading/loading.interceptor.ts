import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { LOADING_KEY } from './loading.token';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const key = req.context.get(LOADING_KEY);
  if (!key) return next(req);

  const loadingService = inject(LoadingService);
  loadingService.start(key);

  return next(req).pipe(finalize(() => loadingService.stop(key)));
};
