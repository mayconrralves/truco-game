import React from "react";
import { Switch } from 'react-router-dom';

import CustomRouter from "./CustomRoute";

import ConfigGame from "../components/ConfigGame";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from '../components/Profile';
import Game from "../components/Game";

export default function RoutesApp(){
    return (
            <Switch>
                    <CustomRouter path='/' auth exact comp={ Login} />
                    <CustomRouter path='/login' auth exact comp={ Login } />
                    <CustomRouter path='/signup' auth exact comp={ Signup } />
                    <CustomRouter path='/profile' auth exact comp={ Profile } protect />
                    <CustomRouter path='/game' auth exact comp={ ConfigGame } protect />
                    <CustomRouter path='/game/start' auth exact comp={ Game } protect />
            </Switch>
    )
}