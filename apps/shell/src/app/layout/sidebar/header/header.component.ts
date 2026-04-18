import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
// import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { NavUserComponent } from '../nav-user/nav-user.component';
import { NavLangComponent } from '../nav-lang/nav-lang.component';

@Component({
  selector: 'ng-mf-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmSidebarImports,
    HlmSeparatorImports,
    // HlmBreadcrumbImports,
    NavUserComponent,
    NavLangComponent,
  ],
})
export class HeaderComponent {}
