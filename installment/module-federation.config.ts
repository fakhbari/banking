import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'installment',
  library: { type: "var", name: "installment" },
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
