import React, { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../components/AuthContext";

export default function ProtectedRouter({ children }){

    const { user } = useContext(AuthContext);
    return !user?.token ? (
        <Navigate to='/' replace/>
    ): (
        children
    ) 

}