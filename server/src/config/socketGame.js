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
        await clientRedis.set(uuid, JSON.stringify({name, user, userId}));
        socket.broadcast.emit('room_uuid',{
                room: uuid,
                name,
                user,
                userId,
                created: true,
        });
    });

    socket.on('join_game', async ({ uuid, user, userId })=>{
        const numbersUsers = socket.adapter.rooms.get(uuid)?.size ?? 0;
        
        if(numbersUsers === 0){
            socket.emit('room_no_created');
        }
        else if(numbersUsers < NUM_PLAYERS){
            socket.join(uuid);
            const data = await clientRedis.get(uuid);
            if(!data){
                io.to(socket.id).emit('error', {
                    msg: 'Uuid not found',
                });
                return;
            }
            const room = JSON.parse(data);
            //send to others clients that a new player has joined
            socket.to(uuid).emit('success_join', { 
                user, 
                room: uuid, 
                userId, 
                name: room.name, 
                created: false 
            });
            //Return to the joined user
            io.to(socket.id).emit('joined', { ...room, room: uuid, created: false });
            if(socket.adapter.rooms.get(uuid).size === NUM_PLAYERS){
                io.in(uuid).emit('start_game', { uuid });
            }
        } 
        else {
            socket.emit('full_game');
        }
    });

    socket.on('list_created_games',async ()=>{
        const rooms = listRooms(socket);
       const games = [];
            const uuid = await clientRedis.get(socket.id);
            for(let room of rooms){
                if(uuid === room){
                    continue;
                }else {
                    const data = await clientRedis.get(room);
                    games.push({room, ...JSON.parse(data)});
                }
            }
            io.to(socket.id).emit('list_games',{  
                games,
            });
    });
    socket.on('go_out_player', async ({uuid, user})=>{
        const data = await clientRedis.get(uuid);
        if(!data){
            io.to(socket.id).emit('error',{
                msg: 'Uuid not found'
            });
            return;
        }
        socket.leave(uuid);
        socket.to(uuid).emit('go_out_player', {
           uuid,
           user,
        });
        emitRemovedUuid(socket, uuid);
        await clientRedis.del(socket.id);
    });
    socket.on('end_game', async ({ uuid })=> {
        const data = await clientRedis.get(uuid);
        if(!data){
            io.to(socket.id).emit('error', {
                msg: 'uuid not found',
            });
            return;
        }
        await clientRedis.del(uuid);
        await clientRedis.del(socket.id);
        socket.leave(uuid);
        io.to(socket.id).emit('end_game');
        emitRemovedUuid(socket, uuid, data);
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