import { ModuleFederationConfig } from '@nx/webpack';

const sharedLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@banking/data-context',
  '@emotion/cache',
  'stylis',
  '@emotion/react',
  'stylis-plugin-rtl'
]);

const config: ModuleFederationConfig = {
  name: 'shell',
  library: { type: "var", name: "shell" },
  shared: (libraryName, defaultConfig) => {
    if (sharedLibraries.has(libraryName)) {
      return defaultConfig;
    }
    return false;
  },
  exposes: {
    './Services':'./src/app/services.ts'
  },
};

export default config;
