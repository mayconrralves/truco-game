import express, { Router } from 'express';
import http from 'http';

import startDatabase from './src/database/sequelizedb';
import './src/shared/container';
import 'dotenv/config';
import { CreateUserController } from './src/modules/accounts/useCases/createUsersUseCase/CreateUserController';
import { LoginUserController } from './src/modules/accounts/useCases/loginUserUseCase/LoginUserController';
import { Server } from 'socket.io';
import cors from 'cors';
import { initGame } from './src/modules/WebSocketGame/gameSocket';

const server = express();

startDatabase();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const router = Router();
router.post('/user/create', createUserController.handle);
router.post('/auth/login', loginUserController.handle);
server.use(express.json());
server.use(cors());
server.use(router);

const httpServer = http.createServer(server);
const io = new Server(httpServer, { cors: { origin: '*' } });
initGame(io);
httpServer.listen(8000, async () => {
    console.log('listen on 8000');
});
