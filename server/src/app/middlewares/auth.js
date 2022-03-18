import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import 'dotenv/config';

export default async (req, res, next)=>{

    if(!req.headers.authorization) {
        return res.status(401).json({
            error: 'Token not provided'
        });
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT);
        req.userId = decoded.id;
        next();
    }catch(error){
        return res.status(401).json({
            error: 'Token invalid'
        });
    }

    next();
}