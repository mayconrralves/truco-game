import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserFormStyle } from './styles';


function UserForm({ setUser, isUpdate, sendData, user, onCanceled, success, error }) {
    return (
        <UserFormStyle>
            <Formik
                initialValues={
                    {
                        name: user ? user.name: '',
                        email: user ? user.email: '',
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
                                     .min(6, 'A senha deve ter pelo menos 6 ou mais caracteres'),
                        confirmPassword: Yup.string()
                                            .oneOf([Yup.ref('password')], "Senhas não conferem"),
                        oldPassword: Yup.string()
                                        .when('password',{
                                            is: ( password )=> isUpdate && password,
                                            then: schema=> schema.required('É necessário senha anterior'),
                                            otherwise: schema=> schema.notRequired()
                                        }),          
                    }
                )}
                onSubmit={
                    async (values)=>{
                        let data;
                        if(isUpdate){
                            data = await sendData({...values, bearerToken: user.token});
                        }else {
                            data = await sendData ({...values});
                        }
                        if(data.error){
                            error();
                        } 
                        else  {
                            isUpdate && setUser({...data, token: user.token});
                            success();
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
                        { isUpdate && <button type='button' onClick={onCanceled}>Cancelar</button>}
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
        if(props['isUpdate']=== true && typeof props[propName] !== 'function'){
            return new Error("Error, when isUpdate is passed to props, setUser must be declared.");
        }
    },
    sendData: PropTypes.func.isRequired,
    onCanceled: function(props, propName, componentName){
        if(props[propName] && typeof props[propName] !== 'function'){
            return  new Error("Error, onCanceled must be a function type");
        }
        if(props['isUpdate'] === true && typeof props[propName] !== 'function'){
            return new Error ("Error, when isUpdate is passed to props, onCanceled must be declared.")
        }
    },
    user: function(props, propName, componentName){
        if(props[propName] === null) {
            return new Error("Error, user must not be null");
        }
        if(props[propName] && typeof props[propName] !== 'object'){
            return  new Error("Error, user must be a object type");
        }
        if(props['isUpdate'] === true && typeof props[propName] !== 'object'){
            return new Error ("Error, when isUpdate is passed to props, user must be declared.")
        }
    },
    success: PropTypes.func,
    error: PropTypes.func,
};

export default UserForm;