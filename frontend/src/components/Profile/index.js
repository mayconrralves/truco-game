import React, { useContext } from 'react'
import { signup } from '../../services/api.js'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js'

 
export default function Profile() {
    const [ _, setUser ] = useContext(AuthContext).user;
    return <UserForm isUpdate sendData={signup} setUser={setUser}/>
}