import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/api.js'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js'

 
export default function Profile() {
    const navigate = useNavigate();
    const onCanceled = () => {
        navigate(-1);
    };
    const { setUser } = useContext(AuthContext);
    return <UserForm isUpdate sendData={signup} setUser={setUser} onCanceled={onCanceled}/>
}