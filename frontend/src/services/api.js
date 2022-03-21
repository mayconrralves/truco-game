import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const signin = async ({ email, password})=>{
    try {
        const data = await api.post('/auth/login',{
            email, 
            password,
        });
        return data.data;
    }
    catch(error){
        return error.response.data;
    }
}
export const signup = async ({username, email, password})=>{
    try{
        const data = await api.post('/user/create',{
            name: username,
            email,
            password,
        });
        return data.data;
    }catch(error){
        return error.response.data;
    }
} 