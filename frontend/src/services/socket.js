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

export const initGame=(callback, id)=>{
    socket.on('uuid', data=>{
        if(callback && typeof callback === 'function'){
            callback(data.uuid);
        }
        else {
            throw Error("callback must be a function");
        }
    });
    socket.emit('create_game', {id });
}
export const listGames=(callback)=>{
    socket.on('list_games', data =>{
        if(callback && typeof callback === 'function'){
            callback(data);
        } else {
            throw Error("callback must be a function");
        }
    });
    socket.emit('list_created_games');
}
export const disconnect = () => {
    socket.disconnect();
}