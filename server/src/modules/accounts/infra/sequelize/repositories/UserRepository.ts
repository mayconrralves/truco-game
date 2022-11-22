import { UserRepositoryDTO } from '../../../dtos/UserRepositoryDTO';
import { User } from '../entities/User';
import { IUserRepository } from './interfaces/IUserRepository';

class UserRepository implements IUserRepository {
    async update(user: User): Promise<User> {
        await user.save();
        return user;
    }
    async create({ name, email, password }: UserRepositoryDTO): Promise<User> {
        const user = new User({ name, email, password });
        await user.save();
        return user;
    }

    async findUserById(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        return user;
    }
}

export { UserRepository };
