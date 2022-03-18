import { Router } from 'express';
import UsersController from './app/controllers/Users';
import SessionController from './app/controllers/Session';
import './config/auth';

const routes = new Router();

routes.get('/', (req, res)=>{
    res.send('teste')
});
routes.post('/user/create', UsersController.store);
routes.post('/auth/login', SessionController.store);

export default routes;