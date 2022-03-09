import { io } from "socket.io-client";
let socket = null;

export const connect = ()=>{
    socket = io(
                'http://localhost:8000',
                { transports: [
                    'websocket', 
                    'polling',
                    'flashsocket'
                ]},
    );
}

export const initGame=()=>{
    console.log('init', socket)
    socket.emit('init game' ,'teste');
}
