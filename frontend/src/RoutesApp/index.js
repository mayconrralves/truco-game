import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from "../components/Login";
import Signup from "../components/Signup";

export default function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index path='/' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
      
    )
}