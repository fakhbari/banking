import { ModuleFederationConfig } from '@nx/webpack';

const sharedLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@banking/data-context',
]);

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['customer', 'deposit', 'facilities', 'installment'],
  shared: (libraryName, defaultConfig) => {
    if (sharedLibraries.has(libraryName)) {
      return defaultConfig;
    }
    return false;
  },
};

export default config;
