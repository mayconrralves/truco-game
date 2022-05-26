import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { GameContext } from "../GameContext";
import { StyleMenu } from "./styles";

export default function Menu(){

    const {user, getUser, signout } = useContext(AuthContext);
    const {uuid, socket, startGame } = useContext(GameContext);
    const [register, setRegister] = useState(false);

    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[user, getUser]);

    const changeRegister = ()=>{
        setRegister(!register);
    }
    const clickSair =()=>{
        if(startGame){
            socket.emit('go_out_player', {
                uuid,
                user: user.name,
            });
        }
        signout();
    }
    return( 
        <div>
            <StyleMenu>
                {
                    !user?.token ? <>
                       { register && <Link to="/" onClick={changeRegister}>Entrar</Link>}
                       { !register && <Link to='/signup' onClick={changeRegister}>Cadastrar</Link>}
                    </> : (
                        <>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/game'>Iniciar Jogo</Link>
                        <button onClick={clickSair}> Sair </button>  
                        </>
                    )
                }
            </StyleMenu>

        </div>
    )

}