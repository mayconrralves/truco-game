import React from 'react';
import { Outlet } from 'react-router';


//main
function App() {
  return (
    <main className="App">
        <Outlet/>
      </main>
  );
}

export default App;
