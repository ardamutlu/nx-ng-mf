import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AuthService, AuthStore } from '@company/auth/data-access';
import { NgTemplateOutlet, SlicePipe, UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ng-mf-nav-user',
  templateUrl: './nav-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmAvatarImports,
    NgIcon,
    HlmDropdownMenuImports,
    HlmButtonImports,
    SlicePipe,
    UpperCasePipe,
    TranslatePipe,
    NgTemplateOutlet,
  ],
  providers: [provideIcons({ lucideLogOut })],
})
export class NavUserComponent {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  public readonly user = computed(() => this.authStore.user());

  logout(): void {
    this.authService.logout().subscribe();
  }
}
