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
    socket.on('create_game',async ({ name, user, idUser })=>{
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
        await clientRedis.set(uuid, JSON.stringify({name, user, idUser}));
        io.to(socket.id).emit('created_game', {
            room: uuid,
        });
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
            const room = JSON.parse(data);
            //send to others clients that a new player has joined
            socket.to(uuid).emit('success_join', { user, userId, name: room.name, created: false });
            //return the room creator's data to the client
            io.to(socket.id).emit('joined', { ...room, created: true });
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
            const uuid = await clientRedis.get(socket.id)
            for(let room of rooms){
                if(uuid === room){
                    continue
                }else {
                    const data = await clientRedis.get(room);
                    games.push({room, ...JSON.parse(data)});
                }
            }
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
        socket.broadcast.emit('removed_uuid', {
            uuid
        });
    });
}