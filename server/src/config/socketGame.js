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
    socket.on('create_game',async ({ id, name, username })=>{
        const uuidExists = await clientRedis.get(socket.id);
        if(uuidExists){
            socket.emit('exists_uuid',{
                uuid: uuidExists
            });
            return;
        }
        const uuid = uuid4();
        socket.join(uuid);
        await clientRedis.set(socket.id, uuid);
        await clientRedis.set(uuid, name);
        socket.broadcast.emit('room_uuid',{
            game: {
                room: uuid,
                name,
                username,
            }
        });
    });

    socket.on('join_game', async ({ uuid, name })=>{
        const numbersUsers = socket.adapter.rooms.get(uuid).size;
        if(numbersUsers < 2){
            socket.to(uuid).emit('success_join', { uuid, name });
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
            console.log('list games', games);
            io.to(socket.id).emit('list_games',{  
                games,
            });
    });

    socket.on('end_game', async ({ uuid })=> {
        await clientRedis.del(uuid);
        await clientRedis.del(socket.id);
    });

    socket.on('disconnect', async()=>{
        const uuid = await clientRedis.get(socket.id);
        await clientRedis.del(uuid);
        await clientRedis.del(socket.id);
        const rooms = listRooms(socket);
        console.log(rooms)
        console.log('desconectado', socket.id, uuid);
        socket.broadcast.emit('removed_uuid', {
            uuid
        })
    });
}