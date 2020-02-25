import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import errorHandler from './errorHandler';
import router from './router';
import http from 'http';
import Socket from 'socket.io';

const { PORT, CORS_DOMAIN } = process.env;
const app = new Koa();

app.use(logger());

if (CORS_DOMAIN) {
    console.warn(`WARNING: Allowing CORS from ${CORS_DOMAIN}`);
    app.use(cors({ origin: CORS_DOMAIN }));
}

app.use(bodyParser());
app.use(errorHandler());
app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = Socket(server);

io.on('connection', socket => {
    console.log('CLIENT CONNECTED TO SOCKET');
});

server.listen(PORT || 3000);