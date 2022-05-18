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
export const initGame=async (socket, io)=>{
   const clientRedis = await connectRedis();
    socket.on('create_game',async ({ name, user, userId })=>{
        const uuid = uuid4();
        socket.join(uuid);
        io.to(socket.id).emit('created_game', {
            room: uuid,
        });
        await clientRedis.set(socket.id, uuid);
        await clientRedis.set(uuid, JSON.stringify({name, user, userId, start: false}));
        socket.broadcast.emit('room_uuid',{
                room: uuid,
                name,
                user,
                userId,
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
                    event: 'join_game',
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
            });
            //Return to the joined user
            io.to(socket.id).emit('joined', { ...room, room: uuid });
            if(socket.adapter.rooms.get(uuid).size === NUM_PLAYERS){
                io.in(uuid).emit('start_game', { uuid });
                await clientRedis.set(uuid,JSON.stringify({...room, start: true}));
                const myUuid = await clientRedis.get(socket.id);
                if(myUuid){
                    await clientRedis.del(myUuid);
                    await clientRedis.del(socket.id);
                    socket.leave(myUuid);
                }
                socket.broadcast.emit('full_game', {room: uuid});
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
                if(!(uuid === room)){
                    const data = await clientRedis.get(room);
                    const dataRoom = JSON.parse(data);
                    if(data && !dataRoom.start){
                        games.push({room, ...dataRoom});
                    }
                }
            }
            io.to(socket.id).emit('list_games',{  
                games,
            });
    });
    socket.on('go_out_player', async ({uuid, user})=>{
        const data = await clientRedis.get(uuid);
        socket.to(uuid).emit('go_out_player', {
            uuid,
            user,
        });
        io.to(uuid).emit('removed_uuid');
        await clientRedis.del(socket.id);
        await clientRedis.del(uuid);
        socket.leave(uuid);
    });
    socket.on('end_game', async ({ uuid })=> {
        await clientRedis.del(uuid);
        await clientRedis.del(socket.id);
        socket.to(uuid).emit('end_game');
        socket.to(uuid).emit('removed_uuid');
        socket.leave(uuid);
    });

    socket.on('disconnect', async()=>{
        const uuid = await clientRedis.get(socket.id);
        if(!uuid) return;
        await clientRedis.del(uuid);
        await clientRedis.del(socket.id);
    });
}