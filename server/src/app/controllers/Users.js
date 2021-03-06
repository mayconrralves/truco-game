import  {Users} from '../models';
import { Op } from 'sequelize';

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
        return res.status(200).json({
            name,
            email,
        });
    }
    async update (req, res){
        const { userId } = req;
        const user = await Users.findByPk(userId);
        if(req.body.email){
            const otherUser = await Users.findAll({
               where: {
                    id: {
                        [Op.not]: [ userId ],
                    },
                    email: req.body.email,
               }
            });
            if(otherUser.length){
                return res.status(404).json({error:'email already exists'});
            }
        }
        await user.update(req.body);
        
        const {name, email, id } = await Users.findByPk(userId);
        return res.status(200).json({
            id,
            name,
            email
        });
    }
    async index(req, res){
        const { userId } = req;
        const { name, email, id } = await Users.findByPk(userId);
        return res.status(200).json({
          id,
          name,
          email,
        });
    }
}


export default new UsersController();