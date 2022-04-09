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
export const initGame=async (socket, io)=>{
   const clientRedis = await connectRedis();
    socket.on('create_game',async ({ id, name })=>{
        const uuid = uuid4();
        socket.join(uuid);
        await clientRedis.set(id, name);
        await clientRedis.set(uuid, name);
        socket.emit('uuid',{
            uuid,
        });
    });

    socket.on('join_game', async ({ uuid, id, name })=>{
        const numbersUsers = socket.adapter.rooms.get(uuid).size;
        if(numbersUsers < 2){
            await clientRedis.set(id, name);
            socket.to(uuid).emit('success_join', { uuid });
        } else {
            socket.emit('full_game');
        }
    });

    socket.on('list_created_games',async ()=>{
       const rooms = listRooms(socket);
       const games = [];
            for(let room of rooms){
                const name = await clientRedis.get(room);
                games.push({name, room});
            }
            io.to(socket.id).emit('list_games',{  
                games,
            });
    });

    socket.on('end_game', async ({ uuid, id})=> {
        await clientRedis.del(uuid);
        await clientRedis.del(id);
    });
    socket.on('disconnect', ()=>{
        console.log('desconectado');
    });
}