import React, {useEffect, useState} from 'react'

export const AuthContext = React.createContext(null);

export default function Auth({ children}) {

    const [user, setUser] = useState(null);

     useEffect(()=>{
        console.log(user);
    },[user]);
    const values={ user: [user, setUser] };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}