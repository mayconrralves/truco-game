import { Router } from 'express';
import UsersController from './app/controllers/Users';
import SessionController from './app/controllers/Session';
import auth from './app/middlewares/auth';
import './config/auth';


const routes = new Router();

routes.get('/', (req, res)=>{
    res.send('teste')
});
routes.post('/user/create', UsersController.store);
routes.post('/auth/login', SessionController.store);
routes.use(auth);
routes.patch('/user/update', UsersController.update);
routes.get('/user/index', UsersController.index);

export default routes;