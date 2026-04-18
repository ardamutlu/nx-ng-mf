import { Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { i18nLoader } from '../i18n.loader';
import { resolveLang } from '../utils';

export function provideI18nService(namespaces: string[]): Provider {
  const lang: string = resolveLang();
  return [
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new i18nLoader(
            http,
            `${window.location.origin}/assets/i18n`,
            namespaces,
          ),
        deps: [HttpClient],
      },
      fallbackLang: lang,
      lang: lang,
    }),
  ];
}
