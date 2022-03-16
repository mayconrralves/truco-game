import { Router } from 'express';
import UsersController from './app/controllers/Users';

const routes = new Router();

routes.get('/', (req, res)=>{
    res.send('teste')
});
routes.post('/user/create', UsersController.store);

export default routes;