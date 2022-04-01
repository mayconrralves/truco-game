import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { StyleMenu } from "./styles";

export default function Menu(){

    const {user, getUser, signout} = useContext(AuthContext);
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);

    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[user]);

    const changeRegister = ()=>{
        setRegister(!register);
    }
    const clickSair =()=>{
        signout();
        navigate('/')
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