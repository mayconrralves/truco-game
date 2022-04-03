import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import App from "../App";
import { GlobalStyle } from "./styles";

import Field from "../components/Field";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Signup from "../components/Signup";
import ProtectedRouter from "./ProtectedRouter";



export default function RoutesApp(){
    return (
        <BrowserRouter>
            <GlobalStyle/>
            <Header/>
            <Routes>
                <Route  path='/' element={<App/>}>   
                    <Route index element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path="/game" element={
                        <ProtectedRouter>
                            <Field />
                        </ProtectedRouter>
                    }/>
                    <Route path='/profile' element={
                        <ProtectedRouter>
                            <Profile />
                        </ProtectedRouter>
                    }/>

                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}