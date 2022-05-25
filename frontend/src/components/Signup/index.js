import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from  'react-toastify';
import UserForm from '../UserForm.js';

import { signup } from '../../services/api';
 
 
export default function Signup() {
    
    const history = useHistory();
    const navigate= () => {
        history.replace('/');
    }
    const success = ()=> {
        toast.success(' Cadastrado com sucesso.');
    }
    const error = () => {
        toast.error('Erro no cadastro!');
    }
    return   <UserForm sendData={signup} success={success} error={error} navigate={navigate}/>
}