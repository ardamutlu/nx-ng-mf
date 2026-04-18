import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, map, of, tap } from 'rxjs';
import { I18nLoader } from './i18n-loader.service';
import { I18nRegistry } from './i18n-registry.service';

@Injectable({ providedIn: 'root' })
export class I18nService {
  translate = inject(TranslateService);
  loader = inject(I18nLoader);
  registry = inject(I18nRegistry);

  loadNamespaces(lang: string, namespaces: string[]) {
    const requests = namespaces
      .filter((ns) => !this.registry.isLoaded(`${lang}:${ns}`))
      .map((ns) => this.loader.load(lang, ns));

    if (!requests.length) return of();

    return forkJoin(requests).pipe(
      map((responses) =>
        Object.fromEntries(namespaces.map((ns, i) => [ns, responses[i]])),
      ),
      tap((results) => this.translate.setTranslation(lang, results, true)),
    );
  }
}
