import React from "react";
import { Route, Switch } from 'react-router-dom';
import ConfigGame from "../components/ConfigGame";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from '../components/Profile';
import CustomRouter from "./CustomRoute";
import Game from "../components/Game";

export default function RoutesApp(){
    return (
            <Switch>
                    <CustomRouter path='/' auth exact >
                        <Login />
                    </CustomRouter>
                    <CustomRouter path='/login' auth exact >
                        <Login />
                    </CustomRouter>   
                    <CustomRouter path='/signup' auth exact >
                        <Signup />
                    </CustomRouter>
                    <CustomRouter path='/profile' exact protect>
                        <Profile />
                    </CustomRouter>
                    <CustomRouter path='/game' exact protect>
                        <ConfigGame />
                    </CustomRouter>
                    <CustomRouter path='/game/start'>
                        <Game />
                    </CustomRouter>
               
            </Switch>
    )
}