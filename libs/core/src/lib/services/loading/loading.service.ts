import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _counters = signal<Map<string, number>>(new Map());

  start(key: string): void {
    this._counters.update((map) => {
      const next = new Map(map);
      next.set(key, (next.get(key) ?? 0) + 1);
      return next;
    });
  }

  stop(key: string): void {
    this._counters.update((map) => {
      const next = new Map(map);
      const count: number = (next.get(key) ?? 1) - 1;
      count <= 0 ? next.delete(key) : next.set(key, count);
      return next;
    });
  }

  isLoading(key: string) {
    return computed(() => (this._counters().get(key) ?? 0) > 0);
  }

  isAnyLoading() {
    return computed(() => this._counters().size > 0);
  }

  isAnyOfLoading(...keys: string[]) {
    return computed(() => keys.some((k) => (this._counters().get(k) ?? 0) > 0));
  }
}
