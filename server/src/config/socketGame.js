import {v4 as uuid4} from 'uuid';
import { connectRedis } from '../config/redis';

const listRooms = (socket) =>{
    let rooms = [];
    for(let room of socket.adapter.rooms.keys()){
        if(room.length === 36){
            rooms.push(room);
        }
    }
    return rooms;
}
export const initGame=async (socket)=>{
   const clientRedis = await connectRedis();
   console.log(clientRedis);
    socket.on('create_game',({ id })=>{
        const uuid = uuid4();
        socket.join(uuid);
        socket.emit('uuid',{
            uuid,
        });
    socket.on('join_game', ({ uuid, id })=>{
        const numbersUsers = socket.adapter.rooms.get(uuid).size;
        if(numbersUsers < 2){
            socket.to(uuid).emit('success_join', { uuid });
        } else {
            socket.emit('full_game');
        }
    });
    socket.on('list_created_games',()=>{
       const games = listRooms(socket);
            socket.emit('list_games',{
                games,
            });
        });
    });
}