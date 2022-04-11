
import { io } from "socket.io-client";


export const connect = ()=>{
        try {
           const  socket = io(
                        'http://localhost:8000',
                        { transports: [
                            'websocket', 
                            'polling',
                            'flashsocket'
                        ]},
            );  
            return socket;

        }catch(error){
            console.error(error);
            return error;
        }
}

// export const initGame=(callback, id, name)=>{
//     socket.on('uuid', data=>{
//         if(callback && typeof callback === 'function'){
//             callback(data.uuid);
//         }
//         else {
//             throw Error("callback must be a function");
//         }
//     });
//     socket.emit('create_game', { id, name });
// }
// export const listGames=()=>{
//     let games;
//     socket.on('list_games', data =>{
//         games = data;
//     });
//     const getGames = ()=> {
//         socket.emit('list_created_games');
//         return games;
//     } 
//     return getGames;
// }
// export const disconnect = () => {
//     socket.disconnect();
// }