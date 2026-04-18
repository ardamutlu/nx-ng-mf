import { ChangeDetectionStrategy, Component } from '@angular/core';
import { lucideCommand, lucideList } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'ng-mf-inset',
  templateUrl: './inset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideCommand, lucideList })],
  imports: [HlmSidebarImports, NgIcon, NavMenuComponent],
})
export class InsetComponent {
  data = [
    {
      name: 'common.menu.dashboard',
      url: '/',
      icon: 'lucideLayoutDashboard',
    },
    {
      name: 'common.menu.repositories',
      url: '/repositories',
      icon: 'lucideList',
    },
  ];
}
