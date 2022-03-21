import React, { useState } from 'react'

export const AuthContext = React.createContext(null);

export default function Auth({ children}) {

    const [user, setUser] = useState(null);

    const values={ user: [user, setUser] };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}