import { SharedLibraryConfig } from '@nx/module-federation';
import { SharedFunction } from '@nx/module-federation/src/utils/models';

const { dependencies } = require('../../package.json');

const CORE_LIBS = new Map<string, SharedLibraryConfig>([
  ['@ngx-translate/core', {}],
  ['@ng-icons/core', {}],
  ['@ng-icons/lucide', {}],
  ['@spartan-ng/brain', {}],
]);

const APP_LIBS = new Map<string, SharedLibraryConfig>([
  ['@company/auth/data-access', {}],
  ['@company/auth/feature-login', {}],
  ['@company/i18n', {}],
  ['@company/core', {}],
  ['@company/shared/ui', {}],
]);

export function createSharedConfig(): SharedFunction {
  return (
    lib: string,
    config: SharedLibraryConfig,
  ): undefined | false | SharedLibraryConfig => {
    if (lib.startsWith('@angular/'))
      return {
        ...config,
        singleton: true,
        strictVersion: true,
        requiredVersion: dependencies['@angular/core'],
      };

    if (lib.startsWith('rxjs'))
      return {
        ...config,
        singleton: true,
        strictVersion: true,
        requiredVersion: dependencies['rxjs'],
      };

    if (CORE_LIBS.has(lib))
      return {
        ...config,
        singleton: true,
        strictVersion: true,
        requiredVersion: dependencies[lib],
        ...CORE_LIBS.get(lib),
      };

    if (APP_LIBS.has(lib))
      return {
        ...config,
        singleton: true,
        eager: false,
        ...APP_LIBS.get(lib),
      };

    return config;
  };
}
