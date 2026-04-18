import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChartPie,
  lucideEllipsis,
  lucideFolder,
  lucideFrame,
  lucideLayoutDashboard,
  lucideMap,
  lucideShare,
  lucideTrash2,
} from '@ng-icons/lucide';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ng-mf-nav-menu',
  templateUrl: './nav-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmSidebarImports,
    NgIcon,
    RouterLink,
    TranslatePipe,
    RouterLinkActive,
  ],
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideEllipsis,
      lucideFolder,
      lucideShare,
      lucideTrash2,
    }),
  ],
})
export class NavMenuComponent {
  public readonly items = input.required<
    {
      name: string;
      url: string;
      icon: string;
    }[]
  >();
}
