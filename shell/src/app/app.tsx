import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const Customer = React.lazy(() => import('customer/Module'));

const Deposit = React.lazy(() => import('deposit/Module'));

const Facilities = React.lazy(() => import('facilities/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/customer">Customer</Link>
        </li>

        <li>
          <Link to="/deposit">Deposit</Link>
        </li>

        <li>
          <Link to="/facilities">Facilities</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />

        <Route path="/customer" element={<Customer />} />

        <Route path="/deposit" element={<Deposit />} />

        <Route path="/facilities" element={<Facilities />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
