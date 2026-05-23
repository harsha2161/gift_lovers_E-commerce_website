import jwt from 'jsonwebtoken';
import AppError from '../../shared/errors/AppError.js';
import User from '../../modules/users/user.model.js';

export async function protect(req, res, next) {
    
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
        //req.user = await User.findById(decoded.id).select('-password') // save user data without passwords
        req.user = decoded
        next()    
    }catch (error) {
        //return next(new AppError('Not authorized, token failed or expired', 401))
        next()
    }
}

export function isAdmin(req, res, next){
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        next(new AppError("Not authorized as an admin", 403))
    }
}

