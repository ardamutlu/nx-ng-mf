import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationObject } from '@ngx-translate/core';
import { of, tap } from 'rxjs';
import { I18nRegistry } from './i18n-registry.service';

@Injectable({ providedIn: 'root' })
export class I18nLoader {
  http = inject(HttpClient);
  registry = inject(I18nRegistry);
  private cache = new Map<string, TranslationObject>();

  load(lang: string, ns: string) {
    const key = `${lang}:${ns}`;

    if (this.cache.has(key)) return of(this.cache.get(key)!);

    return this.http
      .get<TranslationObject>(`/assets/i18n/${lang}/${ns}.json`)
      .pipe(
        tap((res) => {
          this.cache.set(key, res);
          this.registry.markLoaded(key);
        }),
      );
  }
}
