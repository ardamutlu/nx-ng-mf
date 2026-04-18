import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { InsetComponent } from './inset/inset.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ng-mf-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [HlmSidebarImports, HeaderComponent, InsetComponent, RouterOutlet],
})
export class SidebarComponent {}
