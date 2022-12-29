import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./components/AuthContext";
import Game from "./components/GameContext";
import { GlobalStyle } from "./GlobalStyle/styles";
import RoutesApp from "./RoutesApp";
import SendMessagetoServer from "./components/SendMessagetoServerContext";
import { Provider } from "react-redux";
import { store } from "./store";

//main
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Auth>
          <Game>
            <SendMessagetoServer>
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
                  style={{
                    width: "350px",
                    height: "150px",
                  }}
                />
                <RoutesApp />
                <Footer />
              </BrowserRouter>
            </SendMessagetoServer>
          </Game>
        </Auth>
      </Provider>
    </div>
  );
}

export default App;
