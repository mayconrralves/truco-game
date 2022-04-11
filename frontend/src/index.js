import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth from './components/AuthContext';
import RoutesApp from './RoutesApp';
import Game from './components/GameContext';

ReactDOM.render(
  <React.StrictMode>
    <Auth>
      <Game>
        <RoutesApp/>
        <App />
      </Game>
    </Auth>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
