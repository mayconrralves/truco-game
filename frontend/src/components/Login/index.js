import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router';

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
        <div>
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
                                  .email('check your email')
                                  .required("email is required"),
                        password: Yup.string()
                                     .length(6, 'must have 6 or more caracteres')
                                     .required('Password is required')
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
                        <Field type="password" name="password" />
                        <button type="submit">Login</button>
                    </Form>
            
                }
            </Formik>
        </div>
    )
}