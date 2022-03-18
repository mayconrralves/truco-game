import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';

import { Users } from '../app/models';
passport.use('login',new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done)=>{
        try{
            console.log('1234')
            const user = await Users.findOne({ where: { email }});
            if(!user){
                return done(null, false, {message: "User not found"});
            }
            const validate = await user.checkPassword(password);
            if(!validate){
                return done(null, false, {message: 'Wrong password'});
            }
            return done(null, user, {message:'Logged is sussefully'});
        }catch(error){
            return error;
        }
    }
));