import express, { Router } from 'express';

import startDatabase from './src/database/sequelizedb';
import './src/shared/container';
import 'dotenv/config';
import { CreateUserController } from './src/modules/accounts/useCases/createUsersUseCase/CreateUserController';
import { LoginUserController } from './src/modules/accounts/useCases/loginUserUseCase/LoginUserController';

const server = express();
startDatabase();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const router = Router();
router.post('/user/create', createUserController.handle);
router.post('/auth/login', loginUserController.handle);
server.use(express.json());
server.use(router);

server.listen(8000, async () => {
    console.log('listen on 8000');
});
