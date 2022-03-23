import React, { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../components/AuthContext";

export default function ProtectedRouter({ children }){

    const [user, _] = useContext(AuthContext).user;
    const location = useLocation();

    return !user?.token ? (
        <Navigate to='/login' state={{from: location}} replace/>
    ): (
        children
    ) 

}