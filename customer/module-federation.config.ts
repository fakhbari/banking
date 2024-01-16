import { ModuleFederationConfig } from '@nx/webpack';

const sharedLibraries = new Set(['react','react-dom','react-router-dom','@banking/data-context'])

const config: ModuleFederationConfig = {
  name: 'customer',
  library: { type: "var", name: "customer" },
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared:(libraryName,defaultConfig)=>{
    if (sharedLibraries.has(libraryName)) {
      return defaultConfig;
    }
    return false;
  }
};

export default config;
