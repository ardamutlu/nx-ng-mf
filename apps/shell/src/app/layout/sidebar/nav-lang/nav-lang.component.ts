import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { PlatformNavigation, UpperCasePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { Language, SUPPORTED_LANGUAGES } from '@company/i18n';

@Component({
  selector: 'ng-mf-nav-lang',
  templateUrl: './nav-lang.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmAvatarImports,
    HlmDropdownMenuImports,
    HlmButtonImports,
    UpperCasePipe,
  ],
})
export class NavLangComponent {
  public languages = SUPPORTED_LANGUAGES;
  public selectedLang = signal<Language | null>(null);
  private navigation = inject(PlatformNavigation);
  private translate = inject(TranslateService);

  constructor() {
    afterNextRender(() => {
      const lang = this.languages.find(
        ({ value }) => value === this.translate.getCurrentLang(),
      );
      if (lang) this.selectedLang.set(lang);
    });
  }

  changeLang(lang: Language): void {
    localStorage.setItem('lang', lang.value);
    this.navigation.reload();
  }
}
