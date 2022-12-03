import { Server, Socket } from 'socket.io';
import { RedisClientType } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import { CreateGameDTO } from '../dtos/CreateGameDTO';
import { connectRedis } from '../../../database/redis/redis';
import { JoinGameDTO } from '../dtos/JoinGameJDTO';
import { ChooseCoinDTO } from '../dtos/ChooseCoin';
import { StartMatchDTO } from '../dtos/StartMatchDTO';
import { ShuflledDeckDTO } from '../dtos/ShuffledDeckDTO';
import { GoOutPlayerDTO } from '../dtos/GoOutPlayerDTO';
import { EndGameDTO } from '../dtos/EndGameDTO';

class GameSocket {
    private clientRedis: RedisClientType;
    private socket: Socket;
    private io: Server;
    readonly NUM_PLAYERS = 2;
    constructor(io: Server) {
        this.io = io;
    }
    async connect(): Promise<Socket> {
        this.io.on('connection', async (socket: Socket) => {
            this.clientRedis = await connectRedis();
            this.socket = socket;

            this.socket.on('create_game', this.createGame.bind(this));
            this.socket.on('join_game', this.joinGame.bind(this));
            this.socket.on('choose_coin', this.chooseCoin.bind(this));
            this.socket.on('what_winner_coin', this.whatWinnerCoin.bind(this));
            this.socket.on('start_match', this.startMatch.bind(this));
            this.socket.on(
                'list_created_games',
                this.listCreatedGames.bind(this)
            );
            this.socket.on('shuffled_deck', this.shuffledDeck.bind(this));
            this.socket.on('drew_player1', this.drewPlayer1.bind(this));
            this.socket.on('drew_player2', this.drewPlayer2.bind(this));
            this.socket.on('next_move', this.nextMove.bind(this));
            this.socket.on('go_out_player', this.goOutPlayer.bind(this));
            this.socket.on('end_game', this.endGame.bind(this));
            this.socket.on('cancelled_game', this.cancelledGame.bind(this));
            this.socket.on('disconnect', this.disconnect.bind(this));
        });
        return this.socket;
    }

    protected async createGame({ name, user, userId }: CreateGameDTO) {
        const uuid = uuidv4();
        console.log('created', this.socket.rooms.keys());
        this.socket.join(uuid);
        console.log('created', this.socket.rooms.keys());
        this.io.to(this.socket.id).emit('created_game', {
            room: uuid,
            game: {
                name,
                user,
                userId,
            },
        });
        await this.clientRedis.set(this.socket.id, uuid);
        await this.clientRedis.set(
            uuid,
            JSON.stringify({ name, user, userId, start: false })
        );
        this.socket.broadcast.emit('room_uuid', {
            room: uuid,
            name,
            user,
            userId,
        });
        console.log(this.socket.rooms);
    }

    protected async joinGame({
        uuid,
        user,
        userId,
    }: JoinGameDTO): Promise<void> {
        const numbersUsers = this.io.sockets.adapter.rooms.get(uuid)?.size ?? 0;

        if (numbersUsers === 0) {
            this.socket.emit('room_no_created');
        } else if (numbersUsers < this.NUM_PLAYERS) {
            console.log(this.socket.rooms.keys());
            this.socket.join(uuid);
            console.log(this.socket.rooms.keys());
            const data = await this.clientRedis.get(uuid);
            if (!data) {
                this.io.to(this.socket.id).emit('error', {
                    msg: 'Uuid not found',
                    event: 'join_game',
                });
                return;
            }
            const room = JSON.parse(data);
            console.log('success');
            //send to others clients that a new player has joined
            this.socket.to(uuid).emit('success_join', {
                user,
                room: uuid,
                userId,
                name: room.name,
            });
            //Return to the joined user
            // this.socket.emit('joined', { ...room, room: uuid });
            this.io.in(uuid).emit('joined', { ...room, room: uuid });
            const players = this.io.sockets.adapter.rooms.get(uuid)?.size;
            if (players === this.NUM_PLAYERS) {
                console.log('start_game');
                this.io.in(uuid).emit('start_game', { uuid });
                await this.clientRedis.set(
                    uuid,
                    JSON.stringify({ ...room, start: true })
                );
                // const myUuid = await this.clientRedis.get(this.socket.id);
                // if (myUuid) {
                //     console.log('myUUid', myUuid);
                //     await this.clientRedis.del(myUuid);
                //     await this.clientRedis.del(this.socket.id);
                //     this.socket.leave(myUuid);
                // }
                this.socket.broadcast.emit('full_game', { room: uuid });
            }
        } else {
            this.socket.emit('full_game');
        }
        console.log('join_game', numbersUsers, this.socket.rooms);
    }
    protected chooseCoin({ coin, uuid }: ChooseCoinDTO) {
        console.log(coin, this.socket.rooms);
        if (coin === 'heads') {
            console.log('tails, opponent');
            this.socket.to(uuid).emit('opponent_coin', { coin: 'tails' });
        } else if (coin === 'tails') {
            console.log('tails, opponent');
            this.socket.to(uuid).emit('opponent_coin', { coin: 'heads' });
        } else {
            this.socket.to(uuid).emit('error', {
                msg: 'The coin chosen can only be tail or heads',
                event: 'choose_coin',
            });
        }
        return;
    }
    protected whatWinnerCoin({ coin, uuid }: ChooseCoinDTO) {
        const coins = ['heads', 'tails'];

        const coinWinner = coins[Math.floor(Math.random() * 2)];
        if (coinWinner === coin) {
            this.io.to(this.socket.id).emit('winner_coin');
            this.socket.to(uuid).emit('second_player');
        } else {
            this.socket.to(uuid).emit('winner_coin');
            this.io.to(this.socket.id).emit('second_player');
        }
    }
    protected startMatch({ uuid }: StartMatchDTO) {
        this.io.in(uuid).emit('start_match');
    }
    protected listRooms(socket: Socket) {
        let rooms = [];
        for (let room of socket.rooms.keys()) {
            if (room.length === 36) {
                rooms.push(room);
            }
        }
        return rooms;
    }
    protected async listCreatedGames() {
        const rooms = this.listRooms(this.socket);
        const games = [];
        const uuid = await this.clientRedis.get(this.socket.id);
        for (let room of rooms) {
            if (uuid !== room) {
                const data = await this.clientRedis.get(room);

                if (!data) return;

                const dataRoom = JSON.parse(data);

                if (data && !dataRoom.start) {
                    games.push({ room, ...dataRoom });
                }
            }
        }
        this.io.to(this.socket.id).emit('list_games', {
            games,
        });
    }

    protected shuffledDeck({ game, deck, uuid }: ShuflledDeckDTO) {
        game.deck = deck;
        game.uuid = uuid;
        //game.firstPlayer = firstPlayer;
        this.io.in(uuid).emit('shuffled_deck', game);
        this.io.to(this.socket.id).emit('draw_player1', game);
    }

    protected drewPlayer1(data: any) {
        this.socket.to(data.uuid).emit('draw_player2', data);
    }

    protected drewPlayer2(data: any) {
        this.socket.to(data.uuid).emit('end_draw', data);
        this.socket.to(data.uuid).emit('first_move', data);
    }

    protected nextMove(data: any) {
        const { game } = data;
        const { player1, player2 } = game.scores;
        this.io.in(game.uuid).emit('update_state_game', game);
        console.log(data.next);
        console.log('player1', player1);
        console.log('player2', player2);
        // if (
        //     player1.match === 2 ||
        //     (player1.match === 1 &&
        //         player2.match === 1 &&
        //         player1.winFirst === true)
        // ) {
        //     this.io.to(this.socket.id).emit('lose_match');
        //     this.socket.to(game.uuid).emit('win_match');
        //     return;
        // }
        // if (
        //     player2.match === 2 ||
        //     (player1.match === 1 &&
        //         player2.match === 1 &&
        //         player2.winFirst === true)
        // ) {
        //     this.io.to(this.socket.id).emit('win_match');
        //     this.socket.to(game.uuid).emit('lose_match');
        //     return;
        // }

        // if (data.next) {
        //     this.io.to(this.socket.id).emit('update_move', {
        //         move: true,
        //         first: true,
        //         second: false,
        //         game,
        //     });
        //     this.socket.to(game.uuid).emit('update_move', {
        //         move: false,
        //         first: false,
        //         second: true,
        //         game,
        //     });
        // } else {
        //     this.io.to(this.socket.id).emit('update_move', { move: false });
        //     this.socket.to(game.uuid).emit('update_move', { move: true });
        // }
    }

    protected async goOutPlayer({ uuid, user }: GoOutPlayerDTO) {
        // const data = await this.clientRedis.get(uuid);
        this.socket.to(uuid).emit('go_out_player', {
            uuid,
            user,
        });
        this.io.to(uuid).emit('removed_uuid');
        await this.clientRedis.del(this.socket.id);
        await this.clientRedis.del(uuid);
        this.socket.leave(uuid);
    }

    protected async endGame({ uuid }: EndGameDTO) {
        await this.clientRedis.del(uuid);
        await this.clientRedis.del(this.socket.id);
        this.socket.to(uuid).emit('end_game');
        this.socket.to(uuid).emit('removed_uuid');
        this.socket.leave(uuid);
    }

    protected async cancelledGame() {
        const uuid = await this.clientRedis.get(this.socket.id);
        if (!uuid) return;
        this.socket.broadcast.emit('game_cancelled');
        this.io.to(this.socket.id).emit('success_cancelled');
        await this.clientRedis.del(uuid);
        await this.clientRedis.del(this.socket.id);
        this.socket.leave(uuid);
    }

    protected async disconnect() {
        console.log('disconnect');
        const uuid = await this.clientRedis.get(this.socket.id);
        if (!uuid) return;
        await this.clientRedis.del(uuid);
        await this.clientRedis.del(this.socket.id);
    }
}

export { GameSocket };
