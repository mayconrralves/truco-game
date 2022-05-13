import {v4 as uuid4} from 'uuid';
import { connectRedis } from '../config/redis';

const NUM_PLAYERS = 2;

const listRooms = (socket) =>{
    let rooms = [];
    for(let room of socket.adapter.rooms.keys()){
        if(room.length === 36){
            rooms.push(room);
        }
    }
    return rooms;
}
const emitRemovedUuid = (socket, uuid) =>{
    socket.broadcast.emit('removed_uuid', {
        uuid,
    });
}
const removeUuid = async (clientRedis, socket, uuid) =>{
    await clientRedis.del(uuid);
    await clientRedis.del(socket.id);
    socket.leave(uuid);
}
export const initGame=async (socket, io)=>{
   const clientRedis = await connectRedis();
    socket.on('create_game',async ({ name, user, userId })=>{
        const uuidExists = await clientRedis.get(socket.id);
        
        //if the user has already created a room
        if(uuidExists){
            io.to(socket.id).emit('exists_uuid',{
                uuid: uuidExists
            });
            return;
        }
        const uuid = uuid4();
        socket.join(uuid);
        io.to(socket.id).emit('created_game', {
            room: uuid,
        });
        await clientRedis.set(socket.id, uuid);
        await clientRedis.set(uuid, JSON.stringify({
                                                        name, 
                                                        user, 
                                                        userId,
                                                        start: false,
                                                    }));
        socket.broadcast.emit('room_uuid',{
                room: uuid,
                name,
                user,
                userId,
        });
    });

    socket.on('join_game', async ({ uuid, user, userId })=>{
        
    });

    socket.on('list_created_games',async ()=>{
      
    });
    
   

    socket.on('disconnect', async()=>{
        const uuid = await clientRedis.get(socket.id);
        if(!uuid) return;
        const data = await clientRedis.get(uuid);
        if(!data) return;
        await clientRedis.del(uuid);
        await clientRedis.del(socket.id);
        emitRemovedUuid(socket, uuid, data.user);
    });
}