import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { updateUser } from '../../services/api.js'
import { AuthContext } from '../AuthContext';
import UserForm from '../UserForm.js'

 
export default function Profile() {
    const { setUser, user } = useContext(AuthContext);
    const history = useHistory();
    
    const onCanceled = () => {
      history.goBack();
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