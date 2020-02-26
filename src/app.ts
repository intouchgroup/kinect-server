import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import http from 'http';
import Socket from 'socket.io';
import { startKinect, stopKinect } from './kinect';

const { PORT, CORS_DOMAIN } = process.env;
const app = new Koa();

app.use(logger());

if (CORS_DOMAIN) {
    console.warn(`WARNING: Allowing CORS from ${CORS_DOMAIN}`);
    app.use(cors({ origin: CORS_DOMAIN }));
}

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        ctx.status = error.status || 500;
        ctx.body = error.message;
        ctx.app.emit('error', error, ctx);
    }
});

const router = new Router();

router.get('/', (async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Kinect-ion made ;)';
}) as Koa.Middleware);

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = Socket(server);

let clients: { guid: number, socket: Socket.Socket }[] = [];

io.on('connection', socket => {
    console.log('CLIENT CONNECTED');
    startKinect(io);
    const guid = Math.random() * 100;
    clients.push({ guid, socket });

    socket.on('disconnect', async () => {
        console.log('CLIENT DISCONNECTED');
        clients = clients.filter(client => client.guid !== guid);

        if (!clients.length) {
            stopKinect();
        }
    });
});

server.listen(PORT || 3000);