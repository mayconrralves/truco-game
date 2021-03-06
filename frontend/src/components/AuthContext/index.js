import React, { useState } from 'react'
import { signin as signinApi } from '../../services/api';

const NAME_STORAGE_DATA = 'data';

export const AuthContext = React.createContext(null);

export default function Auth({ children }) {

    const [user, setUser] = useState(null);

    const signin = async ({ email, password } )=>{
        const data = await signinApi({ email, password});
        if(data.error){
            return data.error;
        } else {
            localStorage.setItem(NAME_STORAGE_DATA, JSON.stringify(data));
            setUser(data);
            return null;
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
    const values={ user, signin, signout, getUser, setUser };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}