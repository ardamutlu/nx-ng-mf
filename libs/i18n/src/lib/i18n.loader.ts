import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { forkJoin, map, Observable, of, tap } from 'rxjs';

export class i18nLoader implements TranslateLoader {
  private cache = new Map<string, TranslationObject>();

  constructor(
    private http: HttpClient,
    private basePath: string,
    private namespaces: string[],
  ) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    const cached = this.cache.get(lang);

    if (cached) return of(cached);

    const requests = this.namespaces.map((ns) =>
      this.http.get<TranslationObject>(`${this.basePath}/${lang}/${ns}.json`),
    );

    return forkJoin(requests).pipe(
      map((responses) =>
        Object.fromEntries(this.namespaces.map((ns, i) => [ns, responses[i]])),
      ),
      tap((res) => this.cache.set(lang, res)),
    );
  }
}
