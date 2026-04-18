import { ModuleFederationConfig } from '@nx/module-federation';
import { createSharedConfig } from '../../tools/module-federation-shared-config';

const config: ModuleFederationConfig = {
  name: 'shell',
  library: { type: 'var', name: 'shell' },
  remotes: [],
  shared: createSharedConfig(),
};

export default config;
