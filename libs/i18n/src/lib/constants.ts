import { Language } from './i18n.model';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    label: 'Türkçe',
    value: 'tr',
    flag: 'https://keenthemes.com/metronic/tailwind/react/demo1/media/flags/turkey.svg',
  },
  {
    label: 'English',
    value: 'en',
    flag: 'https://keenthemes.com/metronic/tailwind/react/demo1//media/flags/united-states.svg',
  },
] as const;
