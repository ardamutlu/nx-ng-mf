import { SUPPORTED_LANGUAGES } from './constants';

export function resolveLang(): string {
  const userLang = localStorage.getItem('lang');

  if (userLang && SUPPORTED_LANGUAGES.some(({ value }) => value === userLang))
    return userLang;

  const browserLang: string = navigator.language.slice(0, 2);

  if (SUPPORTED_LANGUAGES.some(({ value }) => value === browserLang))
    return browserLang;

  return SUPPORTED_LANGUAGES[0].value;
}
