import passport from 'passport';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Users from './Users';

class SessionController {
    
    async store(req, res, next){
        passport.authenticate(
            'login',
            async (err, user, info)=>{
                try{
                    if(err || !user){
                        return res.status(401).json({
                            error: 'Unauthorized user',
                        });
                    }
                    req.login(
                        user,
                        { session: false },
                        async (error)=>{
                            if(error){
                                return res.status(401).json({
                                    error: 'Unauthorized user',
                                });
                            }
                            const token = jwt.sign(
                                { id: user.id },
                                process.env.SECRET_JWT,
                                {
                                    expiresIn: '1h'
                                }      
                            ); 
                            const { id, name, email} = user;
                            return res.status(200).json({
                                id,
                               name,
                               email,
                               token,
                                
                            });
                        }
                    );
                }catch(error){
                   return res.status(401).json({
                        error: 'Unauthorized user',
                    });
                }
            }
        )(req, res, next);
    }
}

export default new SessionController();