import { ModuleFederationConfig } from '@nx/module-federation';
import { createSharedConfig } from '../../tools/module-federation-shared-config';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Routes': 'apps/auth/src/app/app.routes.ts',
  },
  shared: createSharedConfig(),
};

export default config;
