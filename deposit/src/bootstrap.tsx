import * as ReactDOM from 'react-dom/client';
import {DataProvider} from "@banking/data-context";

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // remove strictMode because of runing useEffect twice
  <DataProvider>
    <App />
  </DataProvider>
);
