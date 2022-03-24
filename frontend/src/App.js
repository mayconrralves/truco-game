import React from 'react';
import { Outlet } from 'react-router';
import { GlobalStyle } from './styles';

//main
function App() {
  return (
    <GlobalStyle>
      <div className="App">
                <Outlet/>
      </div>
    </GlobalStyle>
  );
}

export default App;
