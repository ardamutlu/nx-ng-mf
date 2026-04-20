import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { InsetComponent } from './inset/inset.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'ng-mf-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [HlmSidebarImports, HeaderComponent, InsetComponent, RouterOutlet],
})
export class SidebarComponent {}
