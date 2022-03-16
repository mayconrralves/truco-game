import  {Users} from '../models';

class UsersController {
    async store(req, res){
        const user = await Users.findOne({where: {email: req.body.email}});
        if(user){
            return res.status(400).json({
                error: `User with email ${req.body.email} already exits`,
                email: req.body.email,
            });
        }
        const {name, email } = await Users.create({
            ...req.body,
        });
        res.status(200).json({
            name,
            email,
        });
    }
}

export default new UsersController();