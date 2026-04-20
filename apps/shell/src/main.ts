import { registerRemotes } from '@module-federation/enhanced/runtime';
import { environment } from './environments/environment';

fetch(`/module-federation.manifest.${environment.name}.json`)
  .then((res) => res.json())
  .then((remotes: Record<string, string>) =>
    Object.entries(remotes).map(([name, entry]) => ({ name, entry })),
  )
  .then((remotes) => registerRemotes(remotes))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
