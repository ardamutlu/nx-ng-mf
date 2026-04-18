import { inject, provideEnvironmentInitializer, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, map, merge, of, switchMap } from 'rxjs';
import { I18nService } from '../services/i18n.service';

export function provideI18n(namespaces: string[]): Provider {
  return [
    provideEnvironmentInitializer(() => {
      const translate = inject(TranslateService);
      const i18n = inject(I18nService);

      merge(of({ lang: translate.getCurrentLang() }), translate.onLangChange)
        .pipe(
          map(({ lang }) => lang),
          distinctUntilChanged(),
          switchMap((lang) => i18n.loadNamespaces(lang, namespaces)),
        )
        .subscribe();
    }),
  ];
}
