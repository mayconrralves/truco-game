import { io } from "socket.io-client";
let socket = null;

export const connect = (callback)=>{
    if(callback && typeof callback === 'function'){
        try {
            socket = io(
                        'http://localhost:8000',
                        { transports: [
                            'websocket', 
                            'polling',
                            'flashsocket'
                        ]},
            );  
            callback(true);

        }catch(error){
            console.error(error);
            callback(false);
        }
    }
}

export const initGame=(callback, id, name)=>{
    socket.on('uuid', data=>{
        if(callback && typeof callback === 'function'){
            callback(data.uuid);
        }
        else {
            throw Error("callback must be a function");
        }
    });
    socket.emit('create_game', { id, name });
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
    socket.removeAllListeners("list_created_games");
}
export const disconnect = () => {
    socket.disconnect();
}