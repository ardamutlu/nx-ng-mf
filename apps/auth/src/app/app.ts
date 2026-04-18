import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'ng-mf-auth',
  template: `<router-outlet />`,
})
export class App {}
