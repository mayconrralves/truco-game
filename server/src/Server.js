import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes';
import { initGame } from './config/socketGame';


class ServerApp {
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
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(express.json());
        this.server.use(cors());
    }
    configurationWebSocket(){
        this.io.on('connection',(socket)=>{
            initGame(socket, this.io);
        });
    }
}

export default new ServerApp().httpServer;