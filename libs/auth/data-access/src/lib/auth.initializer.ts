import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthStore } from './auth.store';
import { AuthService } from './auth.service';

export async function initAuth() {
  const authService = inject(AuthService);
  const authStore = inject(AuthStore);

  return firstValueFrom(authService.me())
    .then((user) => authStore.setUser(user))
    .catch((e) => authStore.clear());
}
