import { createClient, RedisClientType } from 'redis';

export async function connectRedis(): Promise<RedisClientType> {
    const client: RedisClientType = createClient({
        socket: {
            host: 'localhost',
            port: 6379,
        },
        username: 'default',
        password: 'redisdb',
    });

    client.on('error', (err) => {
        console.log('Redis Error', err);
    });
    await client.connect();

    return client;
}
