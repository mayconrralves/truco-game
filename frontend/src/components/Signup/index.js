import React from 'react'

import UserForm from '../UserForm.js';

import { signup } from '../../services/api';
 
 
export default function Signup() {
  
    return   <UserForm  sendData={signup} />
}