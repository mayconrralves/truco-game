import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function ProtectedRoute({ children }){

    const { user } = useContext(AuthContext);
    return !user?.token ? (
        <Redirect to='/login' />
    ): ( children ) 

}