import {v4 as uuid4} from 'uuid';


export const initGame=(socket)=>{
    socket.on('init game',()=>{
        const uuid = uuid4();
        socket.join(uuid);
        socket.emit('uuid',{
            uuid,
        });
    });
}