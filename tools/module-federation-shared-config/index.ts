const SINGLETON_LIBS = new Set<string>([
  '@company/auth/data-access',
  '@company/i18n',
  '@ngx-translate/core',
  '@angular/core',
  '@angular/common',
  '@angular/common/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/forms',
  '@angular/animations',
  'rxjs',
  'rxjs/operators',
]);

const EAGER_LIBS = new Set<string>([]);

export function createSharedConfig() {
  return (lib: string, config: any) => {
    if (SINGLETON_LIBS.has(lib)) {
      return {
        ...config,
        singleton: true,
        eager: EAGER_LIBS.has(lib),
      };
    }

    return config;
  };
}
