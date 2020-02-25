import Router from '@koa/router';
import Koa from 'koa';

const router = new Router();

router.get('/', (async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Kinect-ion made ;)';
}) as Koa.Middleware);

router.get('/kinect', (async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Kinect data';
}) as Koa.Middleware);

export default router;
