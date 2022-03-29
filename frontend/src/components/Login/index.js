import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { LoginStyle } from './styles';

export default function Login() {
    
    const {user, signin, error, getUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        
        if(user){
            navigate('/game', { replace: true});
        } else {
            getUser();
        }
    },[user]);
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
                onSubmit={
                    async (values)=>{
                        await signin({...values});
                        const from = location.state?.from?.pathname || '/game';
                        navigate(from, {replace: true});
                    }
                }
            >
                {
                    <Form>
                        <Field type="email" name="email" placeholder="Seu email" />
                        <Field type="password" name="password" placeholder="Sua senha" />
                        <button type="submit">Login</button>
                    </Form>
            
                }
            </Formik>
        </LoginStyle>
    );
}