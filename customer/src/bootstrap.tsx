import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {DataProvider} from "@banking/data-context";
import { createTheme, ThemeProvider } from '@mui/material';
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import App from './app/app';


const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin]
});

const theme = createTheme({
  typography: {
    fontFamily: [
      'IRANSans',
    ].join(','),
  },});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <DataProvider>
      <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </CacheProvider>
    </DataProvider>
  </StrictMode>
);
