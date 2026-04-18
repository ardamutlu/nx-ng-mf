import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { LoadingService } from '@company/core';
import {
  AUTH_KEYS,
  AuthService,
  PassportStrategy,
} from '@company/auth/data-access';

@Component({
  selector: 'ng-mf-auth-feature-login',
  templateUrl: './feature-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    HlmCardImports,
    HlmFieldImports,
    HlmInputImports,
    HlmButtonImports,
    NgIcon,
    TranslatePipe,
  ],
  providers: [provideIcons({ lucideGithub })],
})
export class FeatureLogin {
  loadingService = inject(LoadingService);
  public PassportStrategy: typeof PassportStrategy = PassportStrategy;
  public isLoading = computed<boolean>(() =>
    this.loadingService.isLoading(AUTH_KEYS.login)(),
  );
  private authService: AuthService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  public form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public login(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  public loginWithProvider(strategy: PassportStrategy): void {
    this.authService.loginWithProvider(strategy);
  }
}
