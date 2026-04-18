import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-dashboard',
  template: `<div>{{ 'dashboard.content' | translate }}</div>`,
})
export class DashboardComponent {}
