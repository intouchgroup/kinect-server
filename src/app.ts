import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { errorHandler, generateGuid } from './utility';
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
app.use(errorHandler());

const router = new Router();

router.get('/', (async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Kinect-ion made ;)';
}) as Koa.Middleware);

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = Socket(server);

let clients: { guid: string, socket: Socket.Socket }[] = [];

io.on('connection', socket => {
    const guid = generateGuid();
    clients.push({ guid, socket });
    console.log('CLIENT CONNECTED = ', guid);
    console.log('NUMBER OF CLIENTS = ', clients.length);

    socket.on('disconnect', async () => {
        clients = clients.filter(client => client.guid !== guid);
        console.log('CLIENT DISCONNECTED = ', guid);
        console.log('NUMBER OF CLIENTS = ', clients.length);

        if (!clients.length) {
            stopKinect();
        }
    });

    startKinect(io);
});

server.listen(PORT || 3000);