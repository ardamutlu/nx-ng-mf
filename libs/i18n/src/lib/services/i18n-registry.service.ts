import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class I18nRegistry {
  loaded = new Set<string>();

  isLoaded(key: string): boolean {
    return this.loaded.has(key);
  }

  markLoaded(key: string): void {
    this.loaded.add(key);
  }
}
