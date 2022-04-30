import React from "react";
import { Route, Switch } from 'react-router-dom';
import ConfigGame from "../components/ConfigGame";

import Login from "../components/Login";
import Signup from "../components/Signup";
import ProtectedRoute from "./ProtectedRoute";

export default function RoutesApp(){
    return (
  
            <Switch>
               
                    <Route path='/' exact >
                        <Login />
                    </Route>
                    <Route path='/login' exact >
                        <Login />
                    </Route>   
                    <Route path='/signup' exact >
                        <Signup />
                    </Route>
                    <ProtectedRoute path='/game' exact>
                        <ConfigGame />
                    </ProtectedRoute>
                    {/* <Route path='/signup' element={<Signup/>}/>
                    <Route path='/profile' element={
                        <ProtectedRouter>
                            <Profile />
                        </ProtectedRouter>
                    }/>
                    <Route path='/game/*' element={
                         <ProtectedRouter>
                             <GameRouter />
                         </ProtectedRouter>
                    } />      */}
               
            </Switch>
    )
}