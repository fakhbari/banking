import React from 'react';
import CustomizedTables from "./components/Table";
import { createTheme, ThemeProvider } from '@mui/material';
import "./app.module.css";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';


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
  },
  direction:"rtl"
});

function App() {
  //sample of subscribe to an event
  // (window as any).subscribe('mife-a', (msg:any) => {
  //   console.log('message inside deposit' , msg)
  // });
  return (

    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <CustomizedTables />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
