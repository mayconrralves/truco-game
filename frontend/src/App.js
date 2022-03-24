import React from 'react';
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';


//main
function App() {
  return (
    <div className="App">
          <Outlet/>
    </div>
  );
}

export default App;
