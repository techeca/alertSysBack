import expressJwt from 'express-jwt';
import util from 'util';
//import getConfig from 'next/config';

const { expressjwt } = expressJwt
const something = process.env.API_KEY; //de donde la sacamos?

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: something, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/login',
            '/api/user/register',
            '/api/user/health'
            //'/api/content/stats',
            //'/api/content/home'
        ]
    });

    return util.promisify(middleware)(req, res);
}
