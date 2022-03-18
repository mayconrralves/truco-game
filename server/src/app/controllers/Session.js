import passport from 'passport';

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
                        {session: false},
                        async (error)=>{
                            if(error) return next(error);
                            const body = {id: user.id, email: user.email };
                            return res.status(200).json({
                                message: 'ok',
                                ...user,
                            })
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