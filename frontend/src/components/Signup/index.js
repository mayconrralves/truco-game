import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js';

import { signup } from '../../services/api';
 
 
export default function Signup() {
    const [ _, setUser ] = useContext(AuthContext).user;
    return   <UserForm setUser={setUser} sendData={signup} />
}