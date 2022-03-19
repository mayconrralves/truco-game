import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import RoutesApp from './RoutesApp';

function App() {
  return (
    <div className="App">
          <Header/>
          <RoutesApp/>
          <Footer />
    </div>
  );
}

export default App;
