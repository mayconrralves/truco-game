import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
export default function Menu(){

    const {user, getUser} = useContext(AuthContext);
    const [register, setRegister] = useState(false);

    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[user]);

    const changeRegister = ()=>{
        setRegister(!register);
    }
    return( 
        <div>
            <nav>
                {
                    !user?.token ? <>
                       { register && <Link to="/" onClick={changeRegister}>Entrar</Link>}
                       { !register && <Link to='/signup' onClick={changeRegister}>Cadastrar</Link>}
                    </> : (
                        <>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/game'>Iniciar Jogo</Link>  
                        </>
                    )
                }
            </nav>

        </div>
    )

}