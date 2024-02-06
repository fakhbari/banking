import React from 'react';
import CustomizedTables from "./components/Table";
import {importRemote} from '@module-federation/utilities';

function App() {
  //sample of subscribe to an event
  // (window as any).subscribe('mife-a', (msg:any) => {
  //   console.log('message inside deposit' , msg)
  // });

  const [shellServices,setShellServices] = React.useState<{callServiceOfPlugin:(customer:string , service:string)=>void}>();
  React.useEffect(()=>{
    importRemote({
      url:'http://localhost:4200',
      scope:'shell',
      module:'./Services'
    })
      .then((module:any) =>{
        setShellServices(module)
    })
  },[])
  return (
    <div className="app">
      <button onClick={()=>{shellServices && shellServices.callServiceOfPlugin("customer","sayGoodbye")}}>click me :)</button>
      <CustomizedTables />
    </div>
  );
}

export default App;
