import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={
                {
                  width: '350px',
                  height: '150px',
                }
            }
            />
            <RoutesApp/>
            <Footer/>
          </BrowserRouter>
        </Game>
      </Auth>
    </div>
  );
}

export default App;
