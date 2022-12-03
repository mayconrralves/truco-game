import { Server, Socket } from 'socket.io';
import { connectRedis } from '../../database/redis/redis';

import { v4 as uuid4 } from 'uuid';
import { GameSocket } from './implements/GameSocket';
import { initGame as game } from '../../config/socketGame';
const NUM_PLAYERS = 2;

const listRooms = (socket: Socket) => {
    let rooms = [];
    for (let room of socket.rooms.keys()) {
        if (room.length === 36) {
            rooms.push(room);
        }
    }
    return rooms;
};
export const initGame = async (io: Server) => {
    //const game = new GameSocket(io);
    // game.connect();
    io.on('connection', async (socket) => {
        game(socket, io);
    });
};
