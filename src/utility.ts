import Koa from 'koa';
import crypto from 'crypto';

export const errorHandler = (): Koa.Middleware => async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        ctx.status = error.status || 500;
        ctx.body = error.message;
        ctx.app.emit('error', error, ctx);
    }
};

export const generateGuid = (): string => {
    // Generates a GUID that is compliant with RFC4122v4
    const placeholder = (([ 1e7 ] as any) + -1e3 + -4e3 + -8e3 + -1e11);
    const guid = placeholder.replace(/[018]/g, (character: number) => {
        const randomNumber = (crypto.randomFillSync(new Uint8Array(1))[0] & 15) >> (character / 4);
        const randomString = (character ^ randomNumber).toString(16);

        return randomString;
    });

    return guid;
};