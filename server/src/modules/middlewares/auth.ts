import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

interface IPayload {
    sub: number;
}
export default async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (!request.headers.authorization) {
        return response.status(401).json({
            error: 'Token not provided',
        });
    }
    try {
        const token = request.headers.authorization.split(' ')[1];
        const { sub: user_id } = verify(
            token,
            process.env.SECRET_JWT as string
        );
        request.user = {
            id: parseInt(user_id as string),
        };
        next();
    } catch (error) {
        console.log('error');
        return response.status(401).json({
            error: 'Token invalid',
        });
    }
};
