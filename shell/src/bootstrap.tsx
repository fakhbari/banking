import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // remove strictMode because of runing useEffect twice
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
