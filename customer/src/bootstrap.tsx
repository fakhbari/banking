import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {DataProvider} from "@banking/data-context";
import { createTheme, ThemeProvider } from '@mui/material';

import App from './app/app';

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
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DataProvider>
  </StrictMode>
);
