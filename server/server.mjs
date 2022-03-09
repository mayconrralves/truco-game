import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import {v4 as uuid4} from 'uuid';

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection',(socket)=>{
    socket.on('init game',(msg)=>{
        socket.brodcasting.emit('uuid game',{
            uuid,
        })
    });
});

httpServer.listen(PORT,()=>{
    console.log(`connect on ${PORT}`);
});
