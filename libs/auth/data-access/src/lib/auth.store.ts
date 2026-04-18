import { computed, Injectable, signal } from '@angular/core';
import { User } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();
  isAuthenticated = computed<boolean>(() => !!this._user());

  setUser(user: any): void {
    this._user.set(user);
  }

  clear(): void {
    this._user.set(null);
  }
}
