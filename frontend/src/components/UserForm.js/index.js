import React from 'react'
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserFormStyle } from './styles';

 
function UserForm({ setUser, isUpdate, sendData }) {
    
    return (
        <UserFormStyle>
            <Formik
                initialValues={
                    {
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        oldPassword: '',
                    }
                }
                validationSchema={Yup.object().shape(
                    {
                        name: Yup.string()
                                 .required("Nome é obrigatório"),
                        email: Yup.string()
                                  .email('verifique seu email')
                                  .required("Email é obrigatório"),
                        password: Yup.string()
                                     .length(6, 'A senha deve ter pelo menos 6 ou mais caracteres')
                                     .required('Senha é obrigatória'),
                        confirmPassword: Yup.string()
                                            .required(" ")
                                            .oneOf([Yup.ref('password')], "Senhas não conferem"),
                        oldPassword: Yup.string()
                                        .when(['password, oldPassword'],{
                                            is: ( password )=> isUpdate && password,
                                            then: schema=> schema.required('É necessário senha anterior'),
                                            otherwise: schema=> schema.notRequired()
                                        }),
                                            
                    }
                )}
                onSubmit={
                    async (values)=>{
                        const data = await sendData ({...values});
                        if(data.error){
                            alert('error');
                        } 
                        else  {
                            isUpdate && setUser(data);
                            alert('Cadastrado')
                        }
                    }
                }
            >
                {
                    <Form>
                        <Field type="name" name="name" placeholder="Seu nome"/>
                        <span><ErrorMessage name="name" /></span>
                        <Field type="email" name="email" placeholder="Seu email" />
                        <span><ErrorMessage name="email"/></span>
                        {
                            isUpdate && <>
                                <Field type="password" name="oldPassword" placeholder="Senha anterior"/>
                                <span><ErrorMessage name="oldPassword"/></span>
                            </>
                        }
                        <Field type="password" name="password" placeholder="Sua Senha"/>
                        <span><ErrorMessage name="password" placeholder="Sua senha" /></span>
                        <Field type="password" name="confirmPassword" placeholder="Confirme sua senha" />
                        <span><ErrorMessage name="confirmPassword"/></span>
                        <button type="submit">{isUpdate? 'Atualizar' : 'Cadastrar'}</button>
                    </Form>
            
                }
            </Formik>
        </UserFormStyle>
    )  
}

UserForm.propTypes = {
    isUpdate: PropTypes.bool,
    setUser: function(props, propName, componentName){
        if (  props[propName] && typeof props[propName] !== 'function' ){
            return new Error("Error,  setUser must be a fuction type");
        }
        if((props['isUpdate']== true)){
            return new Error("Error, When isUpdate is passed to props, setUser must be declared.");
        }
    },
    sendData: PropTypes.func.isRequired,
};

export default UserForm;