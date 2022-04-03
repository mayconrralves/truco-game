import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/api.js'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js'

 
export default function Profile() {
    const { setUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const onCanceled = () => {
        navigate(-1);
    };
   
    return user ? (
        <UserForm 
            isUpdate 
            sendData={updateUser} 
            setUser={setUser} 
            user={user} 
            onCanceled={onCanceled}
        />
    ) : (
        <div>Carregando...</div>
    )
}