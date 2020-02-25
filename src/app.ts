import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import http from 'http';
import Socket from 'socket.io';
import KinectAzure from 'kinect-azure';

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
const kinect = new KinectAzure();

if (kinect.open()) {
    kinect.startCameras({
        depth_mode: KinectAzure.K4A_DEPTH_MODE_NFOV_UNBINNED,
        color_resolution: KinectAzure.K4A_COLOR_RESOLUTION_1080P
    });

    kinect.createTracker();
}

io.on('connection', socket => {
    console.log('CLIENT CONNECTED');
    kinect.startListening(data => socket.emit('kinectData', data.depthImageFrame));

    socket.on('disconnect', async () => {
        console.log('CLIENT DISCONNECTED');
        await kinect.stopListening();
        kinect.destroyTracker();
        kinect.stopCameras();
    });
});

server.listen(PORT || 3000);