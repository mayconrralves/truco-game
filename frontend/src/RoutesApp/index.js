import React from "react";
import { Route, Switch } from 'react-router-dom';
import ConfigGame from "../components/ConfigGame";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from '../components/Profile';
import ProtectedRoute from "./ProtectedRoute";
import Game from "../components/Game";

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
                    <ProtectedRoute path='/profile' exact>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path='/game' exact>
                        <ConfigGame />
                    </ProtectedRoute>
                    <ProtectedRoute path='/game/start'>
                        <Game />
                    </ProtectedRoute>
               
            </Switch>
    )
}