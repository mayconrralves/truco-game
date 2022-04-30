import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/AuthContext';
import Game from './components/GameContext';
import {GlobalStyle} from './GlobalStyle/styles';
import RoutesApp from './RoutesApp';

//main
function App() {
  return (
    <div className="App">
      <Auth>
        <Game>
          <BrowserRouter>
            <GlobalStyle />
            <Header />
            <RoutesApp/>
            <Footer/>
          </BrowserRouter>
        </Game>
      </Auth>
    </div>
  );
}

export default App;
