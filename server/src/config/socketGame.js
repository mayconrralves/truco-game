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
const emitRemovedUuid = (socket, uuid, user) =>{
    socket.broadcast.emit('removed_uuid', {
        uuid,
        user,
    });
}
export const initGame=async (socket, io)=>{
   const clientRedis = await connectRedis();
    socket.on('create_game',async ({ name, user, idUser })=>{
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
        await clientRedis.set(uuid, JSON.stringify({name, user, idUser}));
        socket.broadcast.emit('room_uuid',{
            game: {
                room: uuid,
                name,
                user,
            }
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
            await clientRedis.set(socket.id, user);
            const room = JSON.parse(data);
            //send to others clients that a new player has joined
            socket.to(uuid).emit('success_join', { user, userId, name: room.name });
            //return the room creator's data to the client
            io.to(socket.id).emit('joined', { ...room });
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
            if(!uuid) {
                io.to(socket.id).emit('error', {
                    msg: 'There are not games',
                });
                return;
            }
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
    socket.on('go_out_player', async ({uuid})=>{
        const data = await clientRedis.get(uuid);
        if(!data){
            io.to(socket.id).emit('error',{
                msg: 'Uuid not found'
            });
            return;
        }
        socket.leave(uuid);
        const parseData = JSON.parse(data);
        socket.to(uuid).emit('go_out_player', {
           ...parseData,
           uuid,
        });
        emitRemovedUuid(socket, uuid, parseData.user);
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
        io.to(socket.id).emit('end_game', {
            uuid,
            ...JSON.parse(data),
        });
        emitRemovedUuid(socket, uuid, data.user);
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