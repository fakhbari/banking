import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './app/app';
import createCache from "@emotion/cache";
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin]
});

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'IRANSans',
    ].join(','),
  },});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // remove strictMode because of runing useEffect twice
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
);
