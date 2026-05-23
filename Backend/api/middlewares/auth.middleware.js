import jwt from 'jsonwebtoken';
import AppError from '../../shared/errors/AppError.js';

export default async function protect(req, res, next) {
    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        token = req.headers.authorization; 
    }

    if (!token) {
        return next(); 
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY, {
            algorithms: ['HS256']
        })
        console.log(decoded)
        req.user = decoded
        next()    
    }catch (error) {
        //return next(new AppError('Not authorized, token failed or expired', 401))
        next()
    }
}
