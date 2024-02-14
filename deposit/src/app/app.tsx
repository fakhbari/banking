import React from 'react';
import CustomizedTables from "./components/Table";

function App() {
  //sample of subscribe to an event
  // (window as any).subscribe('mife-a', (msg:any) => {
  //   console.log('message inside deposit' , msg)
  // });
  return (
    <div className="app">
      <CustomizedTables />
    </div>
  );
}

export default App;
