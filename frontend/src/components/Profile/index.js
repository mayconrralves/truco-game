import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/api.js'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js'

 
export default function Profile() {
    const { setUser, user } = useContext(AuthContext);
    const [userNotEmpty, setUserNotEmpty]= useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user)setUserNotEmpty(!userNotEmpty);
        console.log('teste')
    },[user]);
    const onCanceled = () => {
        navigate(-1);
    };
    console.log(user)
    return userNotEmpty ?  (
        <UserForm 
            isUpdate 
            sendData={updateUser} 
            setUser={setUser} 
            user={user} 
            onCanceled={onCanceled}
        />
    ): (
        <div>Carregando...</div>
    )
}