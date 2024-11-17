
import React, { useState } from 'react';
import Register from './models/register.js';
import Login from './models/login.js';
import Dashboard from './models/dashboard.js';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <>
          <Register />
          <Login setUser={setUser} />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
