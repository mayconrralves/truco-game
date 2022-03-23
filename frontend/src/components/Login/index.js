import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signin } from '../../services/api';
import { AuthContext } from '../AuthContext';

export default function Login() {
    const [user, setUser ] = useContext(AuthContext).user;
    const navigate = useNavigate();
    const location = useLocation();
    const login = (data)=>{
        const from = location.state?.from?.pathname || '/game';
        setUser(data);
        navigate(from, {replace: true});
    }
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
                    async (values, actions)=>{
                        const data = await signin({...values});
                        if(data.error){
                            alert('error');
                        } else {
                            login(data);
                        }
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