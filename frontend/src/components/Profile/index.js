import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/api.js'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js'

 
export default function Profile() {
    const { setUser, user } = useContext(AuthContext);
    const history = useHistory();
    const onCanceled = () => {
      history.goBack();
    };
   const success = ()=> {
       toast.success('Atualizados com sucesso');
   }
   const error = () => {
       toast.error('Erro na atualização');
   }
    return user ? (
        <UserForm 
            isUpdate 
            sendData={updateUser} 
            setUser={setUser} 
            user={user} 
            onCanceled={onCanceled}
            success={success}
            error={error}
        />
    ) : (
        <div>Carregando...</div>
    )
}