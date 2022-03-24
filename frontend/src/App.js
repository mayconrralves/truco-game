import React from 'react';
import { Outlet } from 'react-router';

//main
function App() {
  return (
    <div className="App">
          <Outlet/>
    </div>
  );
}

export default App;
