import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { LoginStyle } from './styles';

export default function Login() {
    
    const {user, signin, getUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if(user){
            navigate('/game', { replace: true});
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
                enableReinitialize={false}
                onSubmit={
                    async (values)=>{
                        const error = await signin({...values});
                        const from = location.state?.from?.pathname || '/game';
                        if(error === null) {
                            navigate(from, {replace: true});
                        }
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