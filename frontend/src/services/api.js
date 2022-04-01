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

export const updateUser = async ({name, email, password, bearerToken})=>{
    console.log(name, bearerToken)
    try{
        const data = await api.patch('/user/update', {
            name,
            email,
            password,
        }, {
            headers: {
                Authorization: `bearer ${bearerToken}`,
            }
        });
        return data.data;
    }catch(error){
        return error.response.data;
    }
}

export const getUser = async () =>{
    try {
        const data = await api.get('/user/index');
        return data.data;
    }catch(error){
        return error.response.data;
    }
}