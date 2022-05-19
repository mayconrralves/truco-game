import React from 'react'
import { toast } from  'react-toastify';
import UserForm from '../UserForm.js';

import { signup } from '../../services/api';
 
 
export default function Signup() {
    
    const success = ()=> {
        toast.success(' Cadastrado com sucesso.');
    }
    const error = () => {
        toast.error('Erro no cadastro!');
    }
    return   <UserForm sendData={signup} success={success} error={error} />
}