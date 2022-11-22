import server from './Server';
import 'dotenv/config';

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`connect on ${PORT}`);
});
