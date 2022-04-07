import { createClient } from 'redis';


export const connectRedis = async () => {
    const client = createClient(
        {
            socket: {
                host: 'localhost',
                port: 6379
            },
            password: 'redisdb'
        }
    );

    client.on('error', err=>{
        console.log('Redis Error', err);
    });
    await client.connect();

    return client;
}

