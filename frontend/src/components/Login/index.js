import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext';

import { LoginStyle } from './styles';

export default function Login() {
    
    const {user, signin } = useContext(AuthContext);
    const history = useHistory();
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };
    return (
        <LoginStyle>
            <Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                    }
                }
                validationSchema={Yup.object().shape(
                    {
                        email: Yup.string()
                                  .email('Verifique seu email')
                                  .required(""),
                        password: Yup.string()
                                     .required('Senha obrigatória')
                    }
                )}
                enableReinitialize={false}
                onSubmit={
                    async (values)=>{
                        const error = await signin({...values});
                        if(error){
                           toast.error('Erro! Verifique o email ou/e a senha.', options);
                        }
                        history.push('/game');
                    }
                }
            >
                {
                    ( {isValid } )=> (
                        <Form >
                            <Field type="email" name="email" placeholder="Seu email" />
                            <Field type="password" name="password" placeholder="Sua senha" />
                            <button type="submit" disabled={!isValid}>Login</button>
                        </Form>
    
                    )
                }
            </Formik>
        </LoginStyle>
    );
}