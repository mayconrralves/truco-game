import React, { useState } from 'react'
import { signin as signinApi } from '../../services/api';

const NAME_STORAGE_DATA = 'data';

export const AuthContext = React.createContext(null);

export default function Auth({ children }) {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
   

    const signin = async ({ email, password } )=>{
        const data = await signinApi({ email, password});
                        if(data.error){
                            setError(data.error);
                            alert('error')
                        } else {
                            localStorage.setItem(NAME_STORAGE_DATA, JSON.stringify(data));
                            setUser(data);
                            setError(null);
                        }
    }
    const signout =()=>{
        localStorage.removeItem(NAME_STORAGE_DATA);
        setUser(null);
    }
    const getUser = ()=> {
        const data =  JSON.parse(localStorage.getItem(NAME_STORAGE_DATA));
        setUser(data);
    }
    const values={ user, error, signin, signout, getUser, setUser };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}