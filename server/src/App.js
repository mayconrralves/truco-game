import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes';
import Game from './app/controllers/Game';

class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
        this.httpServer = http.createServer(this.server);
        this.io = new Server(this.httpServer);
        this.configurationWebSocket();
    }
    routes(){
        this.server.use(routes);
    }
    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
    }
    configurationWebSocket(){
        this.io.on('connection',(socket)=>{
            Game.initGame(socket);
        });
    }
}

export default new App().httpServer;