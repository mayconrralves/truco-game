import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    res.send('teste');
});

// // routes.post('/user/create', UsersController.store);
// routes.post('/auth/login', SessionController.store);
// routes.use(auth);
// routes.patch('/user/update', UsersController.update);
// routes.get('/user/index', UsersController.index);

export default routes;
