import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'facilities',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
