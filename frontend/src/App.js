import React from 'react';
import { Outlet } from 'react-router';
import { GlobalStyle } from './styles';

//main
function App() {
  return (
    <div className="App">
        <GlobalStyle/>
        <Outlet/>
      </div>
  );
}

export default App;
