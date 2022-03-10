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

export const initGame=(callback)=>{
    socket.on('uuid', data=>{
        if(callback && typeof callback === 'function'){
            callback(data.uuid);
        }
        else {
            throw Error("callback must be a function");
        }
    });

    socket.emit('init game');
}
export const disconnect = () => {
    socket.disconnect();
}