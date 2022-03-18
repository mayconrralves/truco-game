import passport from 'passport';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class SessionController {
    
    async store(req, res, next){
        passport.authenticate(
            'login',
            async (err, user, info)=>{
                try{
                    if(err || !user){
                        const error = new Error('An Error ocurred.');
                        return next(error);
                    }
                    req.login(
                        user,
                        { session: false },
                        async (error)=>{
                            if(error) return next(error);
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
                    return next(error);
                }
            }
        )(req, res, next);
    }
}

export default new SessionController();