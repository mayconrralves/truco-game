import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Field from "../components/Field";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProtectedRouter from "./ProtectedRouter";


export default function RoutesApp(){
   
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index path='/' element={<Login/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path="/game" element={
                        <ProtectedRouter>
                            <Field />
                        </ProtectedRouter>
                    }/>

                </Route>
            </Routes>
        </BrowserRouter>
      
    )
}