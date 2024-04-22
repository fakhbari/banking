import React from 'react';
import CustomizedTables from "./components/Table";
import { createTheme, ThemeProvider } from '@mui/material';
import "./app.module.css";

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
    <ThemeProvider theme={theme}>
      <div className="app">
        <CustomizedTables />
      </div>
    </ThemeProvider>
  );
}

export default App;
